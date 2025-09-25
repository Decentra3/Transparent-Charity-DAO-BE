import { Router } from "express";
import {
  createUserController,
  getUserByWalletController,
  editUserController,
  setKYCController,
  setStatusController,
} from "../controllers/userController.js";
import { validateEmail } from "../middlewares/validateEmail.js";

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
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       201:
 *         description: Tài khoản được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64fae1bc1234567890abcd"
 *                 wallet_address:
 *                   type: string
 *                   example: "0x123abc..."
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 username:
 *                   type: string
 *                   example: "username_tcd_1"
 *                 status:
 *                   type: string
 *                   example: "active"
 *                 isKYC:
 *                   type: boolean
 *                   example: false
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64fae1bc1234567890abcd"
 *                 wallet_address:
 *                   type: string
 *                   example: "0x123abc..."
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 username:
 *                   type: string
 *                   example: "username_tcd_1"
 *                 status:
 *                   type: string
 *                   example: "active"
 *                 isKYC:
 *                   type: boolean
 *                   example: false
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
 *               email:
 *                 type: string
 *                 example: "new_email@example.com"
 *               username:
 *                 type: string
 *                 example: "new_username"
 *     responses:
 *       200:
 *         description: Thông tin người dùng được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 wallet_address:
 *                   type: string
 *                 email:
 *                   type: string
 *                 username:
 *                   type: string
 *                 status:
 *                   type: string
 *                 isKYC:
 *                   type: boolean
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
 *         description: ID của người dùng
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 wallet_address:
 *                   type: string
 *                 email:
 *                   type: string
 *                 username:
 *                   type: string
 *                 status:
 *                   type: string
 *                 isKYC:
 *                   type: boolean
 */

/**
 * @swagger
 * /users/{id}/status:
 *   patch:
 *     summary: Cập nhật trạng thái block/active của người dùng
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
 *               status:
 *                 type: string
 *                 enum: [active, blocked]
 *                 example: "active"
 *     responses:
 *       200:
 *         description: Trạng thái người dùng được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 wallet_address:
 *                   type: string
 *                 email:
 *                   type: string
 *                 username:
 *                   type: string
 *                 status:
 *                   type: string
 *                 isKYC:
 *                   type: boolean
 */

router.post("/", createUserController);
router.get("/:wallet", getUserByWalletController);
router.put("/:id", validateEmail, editUserController);
router.patch("/:id/kyc", setKYCController);
router.patch("/:id/status", setStatusController);

export default router;
