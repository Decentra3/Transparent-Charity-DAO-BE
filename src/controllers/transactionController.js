import * as transactionService from "../services/transactionService.js";

// GET /api/transactions/address/:from_address
export const getTransactionsByAddress = async (req, res) => {
  try {
    const { from_address } = req.params;
    const txs = await transactionService.getByFrom(from_address);
    return res.json({ success: true, data: txs });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/transactions?limit=10
export const getTransactions = async (req, res) => {
  try {
    const { limit } = req.query;
    const txs = await transactionService.getTransactions(limit);
    return res.json({ success: true, data: txs });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
