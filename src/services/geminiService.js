// services/aiService.js
import axios from "axios";
import config from "../../config.js";
import { FUNDRAISING_PROMPT } from "../prompts/fundraisingPrompt.js";
import AiResult from "../models/AIResult.js";

export async function analyzeFundraisingProposal(
  project_id,
  description,
  imageBase64
) {
  try {
    const body = {
      contents: [
        {
          role: "user",
          parts: [
            { text: FUNDRAISING_PROMPT },
            { text: `User fundraising proposal: ${description}` },
            ...(imageBase64
              ? [
                  {
                    inline_data: {
                      mime_type: "image/png",
                      data: imageBase64,
                    },
                  },
                ]
              : []),
          ],
        },
      ],
    };

    const response = await axios.post(config.gemini.url, body, {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": config.gemini.apiKey,
      },
      timeout: 15000,
    });

    // Lấy text trả về
    let resultText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!resultText) {
      return await AiResult.findOneAndUpdate(
        { project_id },
        {
          project_id,
          recommendation: "rejected",
          fraud_score: 0,
          key_reasons: ["Gemini returned empty or unexpected response"],
          payload: { description, imageBase64 },
        },
        { upsert: true, new: true }
      );
    }

    resultText = resultText.trim();
    if (resultText.startsWith("```json")) {
      resultText = resultText
        .replace(/^```json\s*/, "")
        .replace(/```$/, "")
        .trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(resultText);
    } catch (e) {
      parsed = {
        recommendation: "rejected",
        fraud_score: 0,
        key_reasons: [resultText],
      };
    }

    // chỉ giữ tối đa 3 key_reasons
    parsed.key_reasons = parsed.key_reasons?.slice(0, 3) || [];

    // Lưu DB
    const saved = await AiResult.findOneAndUpdate(
      { project_id },
      {
        project_id,
        recommendation: parsed.recommendation,
        fraud_score: parsed.fraud_score,
        key_reasons: parsed.key_reasons,
        payload: { description, imageBase64 },
      },
      { upsert: true, new: true }
    );

    return saved;
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

  const result = await AiResult.findOne({ project_id }).select(
    "_id project_id recommendation fraud_score key_reasons payload"
  );

  return result;
}
