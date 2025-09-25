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
 *           default: 10
 *         description: Số lượng giao dịch muốn lấy
 *     responses:
 *       200:
 *         description: Danh sách giao dịch
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   txHash:
 *                     type: string
 *                     example: "0xabc123..."
 *                   from:
 *                     type: string
 *                     example: "0xFromAddress"
 *                   to:
 *                     type: string
 *                     example: "0xToAddress"
 *                   value:
 *                     type: number
 *                     example: 1.5
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-09-24T14:00:00Z"
 */

/**
 * @swagger
 * /transactions/address/{from_address}:
 *   get:
 *     summary: Lấy danh sách giao dịch theo địa chỉ
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: from_address
 *         required: true
 *         schema:
 *           type: string
 *         description: Địa chỉ ví cần lấy giao dịch
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng giao dịch muốn lấy
 *     responses:
 *       200:
 *         description: Danh sách giao dịch theo địa chỉ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   txHash:
 *                     type: string
 *                     example: "0xabc123..."
 *                   from:
 *                     type: string
 *                     example: "0xFromAddress"
 *                   to:
 *                     type: string
 *                     example: "0xToAddress"
 *                   value:
 *                     type: number
 *                     example: 1.5
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-09-24T14:00:00Z"
 */

router.get("/", getTransactions); // GET /api/transactions?limit=10
router.get("/address/:from_address", getTransactionsByAddress); // GET /api/transactions/address/0x...

export default router;
