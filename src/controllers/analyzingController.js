// controllers/aiController.js
import multer from "multer";
import { convertDocxToText } from "../utils/docxParser.js";
import {
  analyzeFundraisingProposal,
  getAiResultByProjectId,
} from "../services/geminiService.js";

/**
 * POST /analyze/proposal
 * Phân tích proposal gây quỹ bằng AI
 */
const storage = multer.memoryStorage(); // lưu file vào RAM, không cần ghi ổ cứng
const upload = multer({ storage });

export const parseProposal = upload.fields([
  { name: "images", maxCount: 5 },
  { name: "docs", maxCount: 2 },
]);
/**
 * POST /analyze/proposal
 * Nhận project_id, text, nhiều ảnh và file DOCX
 */
export const analyzeProposal = [
  async (req, res, next) => {
    try {
      const { project_id, text } = req.body;
      // Chuyển các ảnh thành Base64
      const imagesBase64 = (req.files.images || []).map((file) =>
        file.buffer.toString("base64")
      );

      // Chuyển DOCX thành text
      let docsText = "";
      for (const doc of req.files.docs || []) {
        const docText = await convertDocxToText(doc.buffer);
        docsText += "\n" + docText;
      }

      // Gọi service phân tích
      const result = await analyzeFundraisingProposal(
        project_id.toString().trim(),
        text.trim() + "\n" + docsText,
        imagesBase64
      );

      return res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },
];

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
