import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    eligibilityCriteria: {
      minGPA: Number,
      maxIncome: Number,
      department: [String],
      semester: [Number],
    },
    amount: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: ["Need-based", "Merit-based", "Special", "Other"],
      default: "Other",
    },
    scope: {
      type: String,
      enum: ["National", "International"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    applicantsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Scholarship", scholarshipSchema);
