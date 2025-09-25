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
export const getTransactionsByAddress = async (req, res) => {
  try {
    const { from_address } = req.params;
    const txs = await transactionService.getByFrom(from_address.toLowerCase());
    return res.json({
      success: true,
      count: txs.length,
      data: txs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const getTransactions = async (limit) => {
  const query = Transaction.find().sort({ timestamp: -1 });
  if (limit) {
    return query.limit(Number(limit));
  }
  return query;
};