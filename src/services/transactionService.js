import Transaction from "../models/Transaction.js";

/**
 * Upsert transaction vào DB và trả về document thực tế
 * @param {Object} txDoc
 * @returns {Promise<Object>} Transaction document
 */
export const upsertTransaction = async (txDoc) => {
  return Transaction.findOneAndUpdate(
    { tx_hash: txDoc.tx_hash }, // điều kiện: trùng hash thì không insert
    { $setOnInsert: txDoc }, // chỉ set dữ liệu khi insert mới
    { upsert: true, new: true } // upsert và trả về document mới
  );
};

/**
 * Lấy giao dịch theo địa chỉ from_address
 */
export const getByFrom = async (from_address) => {
  return Transaction.find({ from_address: from_address.toLowerCase() }).sort({
    timestamp: -1,
  });
};

/**
 * Lấy giao dịch giới hạn
 */
export const getTransactions = async (limit) => {
  if (limit && Number(limit) === 10) {
    return Transaction.find().sort({ timestamp: -1 }).limit(10);
  }
  return Transaction.find().sort({ timestamp: -1 });
};
