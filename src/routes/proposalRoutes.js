import express from "express";
import {
  analyzeProposal,
  parseProposal,
  getAiResult,
} from "../controllers/analyzingController.js";
import { validateFundraisingInput } from "../middlewares/validateFundraisingInput.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Analyzing
 *   description: API phân tích đề xuất fundraising
 */

/**
 * @swagger
 * /proposals/analyze:
 *   post:
 *     summary: Phân tích đề xuất fundraising
 *     tags: [Analyzing]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               project_id:
 *                 type: string
 *                 example: "64f5e2abc1234567890abcd"
 *                 description: ID của project cần phân tích
 *               text:
 *                 type: string
 *                 example: "Dự án nhằm cung cấp sách và giáo cụ cho học sinh vùng sâu vùng xa."
 *                 description: Nội dung mô tả dự án
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Hình ảnh dự án, có thể gửi nhiều file
 *               docs:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: File DOCX, có thể gửi nhiều file
 *             required:
 *               - project_id
 *               - text
 *     responses:
 *       200:
 *         description: Kết quả phân tích thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recommendation:
 *                   type: string
 *                   example: "approved"
 *                 fraud_score:
 *                   type: number
 *                   example: 85
 *                 key_reasons:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Proposal is clear and feasible"
 *                 payload:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: base64
 *                     docs_text:
 *                       type: string
 *                       description: Nội dung trích xuất từ file DOCX
 *       400:
 *         description: Dữ liệu gửi lên không hợp lệ
 */

/**
 * @swagger
 * /proposals/result/{project_id}:
 *   get:
 *     summary: Lấy kết quả AI đã phân tích theo project_id
 *     tags: [Analyzing]
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của project
 *     responses:
 *       200:
 *         description: Kết quả AI trả về
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 project_id:
 *                   type: string
 *                 recommendation:
 *                   type: string
 *                   example: "approved"
 *                 fraud_score:
 *                   type: number
 *                   example: 85
 *                 key_reasons:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Proposal is clear and feasible"
 *                 payload:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: base64
 *                     docs_text:
 *                       type: string
 *                       description: Nội dung trích xuất từ file DOCX
 *       404:
 *         description: Kết quả AI không tồn tại
 */
router.post(
  "/analyze",
  parseProposal,
  validateFundraisingInput,
  analyzeProposal
);
router.get("/result/:project_id", getAiResult);

export default router;
