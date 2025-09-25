import express from "express";
import {
  analyzeProposal,
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
 *         application/json:
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
 *               imageBase64:
 *                 type: string
 *                 example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
 *                 description: Hình ảnh dự án dưới dạng Base64
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
 *                 score:
 *                   type: number
 *                   example: 85
 *                 feedback:
 *                   type: string
 *                   example: "Đề xuất rõ ràng, khả thi, nhưng cần chi tiết hơn về kế hoạch chi tiêu."
 *       400:
 *         description: Dữ liệu gửi lên không hợp lệ
 */
router.post("/analyze", validateFundraisingInput, analyzeProposal);

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
 *                       example: "Dự án nhằm cung cấp sách và giáo cụ cho học sinh vùng sâu vùng xa."
 *                     imageBase64:
 *                       type: string
 *                       example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
 *       404:
 *         description: Kết quả AI không tồn tại
 */
router.get("/result/:project_id", getAiResult);

export default router;
