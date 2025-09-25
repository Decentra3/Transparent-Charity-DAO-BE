import mongoose from "mongoose";

const aiResultSchema = new mongoose.Schema(
  {
    project_id: {
      type: String,
      ref: "Project",
      required: true,
    },
    recommendation: {
      type: String,
      enum: ["approved", "rejected"], // optional: hạn chế giá trị
    },
    fraud_score: {
      type: Number,
      min: 0,
      max: 100,
    },
    risk_level: {
      type: String,
      enum: ["Low", "Medium", "High", "Severe"], // optional: hạn chế giá trị
    },
    minimum_quorum: {
      type: String, // lưu kiểu "50%", "66%", "75%", "90%"
    },
    key_reasons: {
      type: [String],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("AIResult", aiResultSchema);
