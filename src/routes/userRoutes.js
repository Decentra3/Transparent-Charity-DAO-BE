import { Router } from "express";
import {
  createUserController,
  getUserByWalletController,
  editUserController,
  setKYCController,
  setStatusController,
} from "../controllers/userController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API quản lý người dùng
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Tạo tài khoản mới
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wallet_address
 *             properties:
 *               wallet_address:
 *                 type: string
 *                 example: "0x123abc..."
 *     responses:
 *       201:
 *         description: Tài khoản được tạo thành công
 */

/**
 * @swagger
 * /users/{wallet}:
 *   get:
 *     summary: Lấy thông tin người dùng theo wallet address
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: wallet
 *         required: true
 *         schema:
 *           type: string
 *         description: Wallet address của người dùng
 *     responses:
 *       200:
 *         description: Thông tin người dùng
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Chỉnh sửa thông tin người dùng
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "new_username"
 *     responses:
 *       200:
 *         description: Thông tin người dùng được cập nhật
 */

/**
 * @swagger
 * /users/{id}/kyc:
 *   patch:
 *     summary: Cập nhật trạng thái KYC của người dùng
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isKYC:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: KYC được cập nhật
 */

/**
 * @swagger
 * /users/{id}/status:
 *   patch:
 *     summary: Toggle trạng thái người dùng (active ↔ block)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Trạng thái người dùng được cập nhật
 */

router.post("/", createUserController);
router.get("/:wallet", getUserByWalletController);
router.put("/:id", editUserController);
router.patch("/:id/kyc", setKYCController);
router.patch("/:id/status", setStatusController);

export default router;