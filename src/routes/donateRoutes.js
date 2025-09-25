import express from "express";
import {
  getDonatesByDonor,
  getDonatesByProject,
} from "../controllers/donateController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Donates
 *   description: API cho các thao tác liên quan đến donate
 */

/**
 * @swagger
 * /donates/donor/{donor_wallet}:
 *   get:
 *     summary: Lấy danh sách donate theo donor_wallet
 *     tags: [Donates]
 *     parameters:
 *       - in: path
 *         name: donor_wallet
 *         required: true
 *         schema:
 *           type: string
 *         description: Wallet address của donor
 *     responses:
 *       200:
 *         description: Danh sách donate của donor thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64f5e2abc123..."
 *                   donor_wallet:
 *                     type: string
 *                     example: "0x123abc"
 *                   project_id:
 *                     type: string
 *                     example: "64f5e2abc456..."
 *                   amount:
 *                     type: string
 *                     example: "1000000000000000000"
 *                   tx_hash:
 *                     type: string
 *                     example: "0xabc123..."
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-09-24T15:00:00.000Z"
 */

/**
 * @swagger
 * /donates/project/{project_id}:
 *   get:
 *     summary: Lấy danh sách donate theo project_id
 *     tags: [Donates]
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của project
 *     responses:
 *       200:
 *         description: Danh sách donate của project thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64f5e2abc123..."
 *                   donor_wallet:
 *                     type: string
 *                     example: "0x123abc"
 *                   project_id:
 *                     type: string
 *                     example: "64f5e2abc456..."
 *                   amount:
 *                     type: string
 *                     example: "1000000000000000000"
 *                   tx_hash:
 *                     type: string
 *                     example: "0xabc123..."
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-09-24T15:00:00.000Z"
 */

// API riêng cho donor_wallet
router.get("/donor/:donor_wallet", getDonatesByDonor);

// API riêng cho project_id
router.get("/project/:project_id", getDonatesByProject);

export default router;
