import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    scholarshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["submitted", "under_review", "evaluated", "approved", "rejected"],
      default: "submitted",
    },
    reviewNotes: String,
    evaluationScore: Number,
    evaluations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Evaluation",
      },
    ],
    documents: {
      CNIC: String,
      feeChallan: String,
      bankInvoice: String,
      incomeCertificate: String,
      resultCard: String,
    },
    eligibilityReason: {
      type: String,
      required: true,
      trim: true,
    },
    tracking: [
      {
        stage: String, // e.g., "submitted", "verified"
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        updatedAt: { type: Date, default: Date.now },
        remarks: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
