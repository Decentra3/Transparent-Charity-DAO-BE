import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    tx_hash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    from_address: {
      type: String,
      required: true,
      index: true,
    },
    to_address: {
      type: String,
      required: true,
    },
    amount: {
      type: String, // wei
      required: true,
    },
    event_type: {
      type: String,
      enum: ["donate", "payout", "deposit", "refund", "vote", "withdraw"],
      required: true,
    },
    project_id: {
      type: Number,
    },
    block_number: {
      type: Number,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
