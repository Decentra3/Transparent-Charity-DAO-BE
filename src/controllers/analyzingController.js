// controllers/aiController.js
import {
  analyzeFundraisingProposal,
  getAiResultByProjectId,
} from "../services/geminiService.js";

export async function analyzeProposal(req, res, next) {
  try {
    const { project_id, text, imageBase64 } = req.body;

    const result = await analyzeFundraisingProposal(
      project_id,
      text,
      imageBase64
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

// GET /analyze/result/:project_id
export const getAiResult = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    if (!project_id) {
      return res.status(400).json({ message: "project_id is required" });
    }

    const result = await aiService.getAiResultByProjectId(project_id);
    if (!result) {
      return res.status(404).json({ message: "AI result not found" });
    }

    return res.json(result);
  } catch (err) {
    next(err);
  }
};
