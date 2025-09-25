import Transaction from "../models/Transaction.js";

export const upsertTransaction = async (txDoc) => {
  // chuẩn hoá trước khi insert
  if (txDoc.from_address) {
    txDoc.from_address = txDoc.from_address.toString().toLowerCase();
  }

  return Transaction.findOneAndUpdate(
    { tx_hash: txDoc.tx_hash }, // điều kiện: trùng hash thì update
    { $setOnInsert: txDoc }, // chỉ set khi insert mới
    { upsert: true, new: true } // upsert + trả về document mới
  );
};

// GET /api/transactions/address/:from_address

export const getTransactionsWithAddress = async (fromAddress) => {
  if (!fromAddress) throw new Error("fromAddress is required");

  // Nếu Transaction.find lỗi (ví dụ DB không kết nối), lỗi sẽ tự throw ra
  const txs = await Transaction.find({ from_address: fromAddress }).lean();
  return txs;
};

export const getTransactions = async (limit) => {
  const query = Transaction.find().sort({ timestamp: -1 });
  if (limit) {
    return query.limit(Number(limit));
  }
  return query;
};
