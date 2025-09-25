import mongoose from "mongoose";

const donateSchema = new mongoose.Schema(
  {
    donor_wallet: {
      type: String,
      required: true,
      index: true,
    },
    donateType: {
      type: String,
      enum: ["direct", "commonFund"],
      required: true,
    },
    project_id: { type: Number, required: false },
    amount: {
      type: String, // lưu wei để không mất precision
      required: true,
    },
    tx_hash: {
      type: String,
      required: true,
      unique: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Donate", donateSchema);
