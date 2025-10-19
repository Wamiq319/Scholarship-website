import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
    committeeMemberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scores: {
      merit: { type: Number, min: 0, max: 100 },
      need: { type: Number, min: 0, max: 100 },
      extracurricular: { type: Number, min: 0, max: 100 },
    },
    comments: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Evaluation", evaluationSchema);
