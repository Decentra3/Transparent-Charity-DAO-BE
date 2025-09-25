import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    wallet_address: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    isKYC: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
