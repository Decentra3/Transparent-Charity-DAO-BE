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
    const { wallet_address, email } = req.body;
    const user = await createUser({ wallet_address, email });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

/** Lấy user theo wallet */
export const getUserByWalletController = async (req, res, next) => {
  try {
    const wallet = req.params.wallet;
    const user = await getUserByWallet(wallet);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

/** Chỉnh sửa thông tin user */
export const editUserController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedUser = await editUser(id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(updatedUser);
  } catch (err) {
    next(err); // middleware xử lý lỗi của Express sẽ bắt được
  }
};
/** Đặt KYC thành true */
export const setKYCController = async (req, res, next) => {
  try {
    const user = await setKYC(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

/** Cập nhật status */
export const setStatusController = async (req, res, next) => {
  try {
    const { status } = req.body;
    const user = await setStatus(req.params.id, status);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
