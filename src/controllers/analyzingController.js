// controllers/aiController.js
import {
  analyzeFundraisingProposal,
  getAiResultByProjectId,
} from "../services/geminiService.js";

/**
 * POST /analyze/proposal
 * Phân tích proposal gây quỹ bằng AI
 */
export async function analyzeProposal(req, res, next) {
  try {
    const { project_id, text, imageBase64 } = req.body;

    // Validate input
    if (!project_id || !text) {
      return res.status(400).json({
        success: false,
        message: "project_id and text are required",
      });
    }

    const result = await analyzeFundraisingProposal(
      project_id.toString().trim(),
      text.trim(),
      imageBase64 ?? null
    );

    return res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /analyze/result/:project_id
 * Lấy kết quả AI theo project_id
 */
export const getAiResult = async (req, res, next) => {
  try {
    const { project_id } = req.params;

    // Validate input
    if (!project_id) {
      return res.status(400).json({
        success: false,
        message: "project_id is required",
      });
    }

    const result = await getAiResultByProjectId(project_id.toString().trim());

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "AI result not found",
      });
    }

    return res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};