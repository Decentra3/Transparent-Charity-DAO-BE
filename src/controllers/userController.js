import {
  createUser,
  getUserByWallet,
  editUser,
  setKYC,
  setStatus,
} from "../services/userService.js";

/** Tạo user mới */
export const createUserController = async (req, res, next) => {
  try {
    const { wallet_address } = req.body;
    if (!wallet_address) {
      return res.status(400).json({
        success: false,
        message: "wallet_address is required",
      });
    }

    const user = await createUser({ wallet_address });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

/** Lấy user theo wallet */
export const getUserByWalletController = async (req, res, next) => {
  try {
    const wallet = req.params.wallet.toLowerCase();
    const user = await getUserByWallet(wallet);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

/** Chỉnh sửa thông tin user */
export const editUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await editUser(id, req.body);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

/** Đặt KYC = true */
export const setKYCController = async (req, res, next) => {
  try {
    const user = await setKYC(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "KYC updated successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

/** Cập nhật status (block/unblock user) */
export const setStatusController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["active", "blocked"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value (must be 'active' or 'blocked')",
      });
    }

    const user = await setStatus(id, status);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: `User status set to ${status}`,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};