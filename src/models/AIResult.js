import mongoose from "mongoose";

const aiResultSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    recommendation: {
      type: String,
    },
    fraud_score: {
      type: Number,
      min: 0,
      max: 100,
    },
    key_reasons: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("AIResult", aiResultSchema);
