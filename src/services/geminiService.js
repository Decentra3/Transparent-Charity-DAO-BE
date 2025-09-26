// services/aiService.js
import axios from "axios";
import config from "../../config.js";
import { FUNDRAISING_PROMPT } from "../prompts/fundraisingPrompt.js";
import AiResult from "../models/AIResult.js";

export async function analyzeFundraisingProposal(
  project_id,
  text
) {
  try {
    const contentsParts = [
      { text: FUNDRAISING_PROMPT },
      { text: `User fundraising proposal: ${text}` },
    ];

    const body = {
      contents: [{ role: "user", parts: contentsParts }],
    };

    const response = await axios.post(config.gemini.url, body, {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": config.gemini.apiKey,
      },
      timeout: 60000,
    });

    let resultText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    resultText = resultText.trim();

    // Loại bỏ ```json nếu có
    if (resultText.startsWith("```json")) {
      resultText = resultText
        .replace(/^```json\s*/, "")
        .replace(/```$/, "")
        .trim();
    }

    let parsed = {};
    try {
      parsed = JSON.parse(resultText);
    } catch (e) {
      // Nếu AI trả về không parse được, fallback
      parsed = {
        recommendation: "rejected",
        fraud_score: 0,
        risk_level: "Low",
        minimum_quorum: "50%",
        key_reasons: [resultText],
      };
    }

    // Chỉ giữ tối đa 3 lý do
    parsed.key_reasons = parsed.key_reasons?.slice(0, 3) || [];

    // Nếu AI không trả minimum_quorum, tính dựa trên fraud_score
    if (!parsed.minimum_quorum) {
      if (parsed.fraud_score >= 90) parsed.minimum_quorum = "90%";
      else if (parsed.fraud_score >= 75) parsed.minimum_quorum = "75%";
      else if (parsed.fraud_score >= 50) parsed.minimum_quorum = "66%";
      else parsed.minimum_quorum = "50%";
    }

    // Tách payload gốc ra riêng, chỉ lưu JSON chuẩn xuống DB
    const saveData = {
      project_id: project_id.toLowerCase(),
      recommendation: parsed.recommendation,
      fraud_score: parsed.fraud_score,
      risk_level: parsed.risk_level || "Low",
      minimum_quorum: parsed.minimum_quorum,
      key_reasons: parsed.key_reasons,
    };

    const saved = await AiResult.findOneAndUpdate(
      { project_id: project_id.toLowerCase() },
      saveData,
      { upsert: true, new: true }
    );

    // Trả về **chỉ JSON chuẩn** (không trả payload cho frontend)
    return saveData;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Gemini API call failed: " + err.message;
    }
    throw err;
  }
}

// Lấy AI result theo project_id
export async function getAiResultByProjectId(project_id) {
  if (!project_id) throw new Error("project_id is required");

  const result = await AiResult.findOne({
    project_id: project_id.toLowerCase(),
  }).select(
    "_id project_id recommendation fraud_score risk_level minimum_quorum key_reasons"
  );

  return result;
}
