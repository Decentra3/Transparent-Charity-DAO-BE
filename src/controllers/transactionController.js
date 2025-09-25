// controllers/transactionController.js
import * as transactionService from "../services/transactionService.js";

/**
 * GET /api/transactions/address/:from_address
 * Lấy danh sách giao dịch theo from_address
 */
export const getTransactionsByAddress = async (req, res, next) => {
  try {
    const { from_address } = req.params;

    if (!from_address) {
      return res.status(400).json({
        success: false,
        message: "from_address is required",
      });
    }

    const txs = await transactionService.getTransactionsWithAddress(
      from_address.toLowerCase().trim()
    );

    return res.json({
      success: true,
      data: txs,
    });
  } catch (err) {
    next(err); // để middleware error handler xử lý
  }
};

/**
 * GET /api/transactions?limit=10
 * Lấy danh sách giao dịch, có thể giới hạn bằng query param "limit"
 */
export const getTransactions = async (req, res, next) => {
  try {
    let { limit } = req.query;

    if (limit !== undefined) {
      limit = Number(limit);
      if (isNaN(limit) || limit <= 0) {
        return res.status(400).json({
          success: false,
          message: "Query param 'limit' must be a positive number",
        });
      }
    }

    const txs = await transactionService.getTransactions(limit);

    return res.json({
      success: true,
      data: txs,
    });
  } catch (err) {
    next(err);
  }
};
