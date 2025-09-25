import User from "../models/User.js";

export const createUser = async ({ wallet_address, email }) => {
  const normalized = wallet_address.toLowerCase();

  // Nếu user đã tồn tại, trả về luôn
  const existing = await User.findOne({ wallet_address: normalized });
  if (existing) return existing;

  // Tạo username duy nhất
  let count = await User.countDocuments();
  let username;
  let exists = true;

  while (exists) {
    username = `username_tcd_${count + 1}`;
    exists = await User.findOne({ username });
    if (exists) count++;
    else break;
  }

  const user = await User.create({
    wallet_address: normalized,
    email,
    username,
    status: "active",
    isKYC: false,
  });

  return user;
};

export const getUserByWallet = (wallet) =>
  User.findOne({ wallet_address: wallet.toLowerCase() });

// Chỉ cập nhật email và username
export const editUser = async (id, updates) => {
  const allowedFields = {};

  if (updates.email) {
    allowedFields.email = updates.email; // email đã được middleware chuẩn hóa
  }

  if (updates.username) {
    allowedFields.username = updates.username.trim();
  }

  return User.findByIdAndUpdate(id, allowedFields, { new: true });
};

export const setKYC = (id) =>
  User.findByIdAndUpdate(id, { isKYC: true }, { new: true });

export const setStatus = async (id, status) => {
  const allowedStatus = ["active", "block"];
  if (!allowedStatus.includes(status)) {
    throw new Error("Status must be 'active' or 'block'");
  }
  return User.findByIdAndUpdate(id, { status }, { new: true });
};
