import { Router } from "express";
import {
  getTransactionsByAddress,
  getTransactions,
} from "../controllers/transactionController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API liên quan đến giao dịch
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Lấy danh sách các giao dịch
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: >
 *           Số lượng giao dịch muốn lấy.
 *           - Nếu truyền `limit` → chỉ lấy đúng số lượng giao dịch đó (ví dụ: 10).
 *           - Nếu **không truyền** → lấy **tất cả giao dịch**.
 *     responses:
 *       200:
 *         description: Danh sách giao dịch
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       txHash:
 *                         type: string
 *                         example: "0xabc123..."
 *                       from:
 *                         type: string
 *                         example: "0xFromAddress"
 *                       to:
 *                         type: string
 *                         example: "0xToAddress"
 *                       value:
 *                         type: number
 *                         example: 1.5
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-09-24T14:00:00Z"
 */

/**
 * @swagger
 * /transactions/address/{from_address}:
 *   get:
 *     summary: Lấy tất cả giao dịch theo địa chỉ ví
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: from_address
 *         required: true
 *         schema:
 *           type: string
 *         description: Địa chỉ ví cần lấy giao dịch
 *     responses:
 *       200:
 *         description: Danh sách tất cả giao dịch theo địa chỉ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       txHash:
 *                         type: string
 *                         example: "0xabc123..."
 *                       from:
 *                         type: string
 *                         example: "0xFromAddress"
 *                       to:
 *                         type: string
 *                         example: "0xToAddress"
 *                       value:
 *                         type: number
 *                         example: 1.5
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-09-24T14:00:00Z"
 */

router.get("/", getTransactions); // GET /api/transactions?limit=10 hoặc lấy hết nếu không có limit
router.get("/address/:from_address", getTransactionsByAddress); // GET /api/transactions/address/0x...

export default router;