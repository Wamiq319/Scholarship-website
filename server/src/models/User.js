import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ["STUDENT", "ADMIN", "COMMITTEE"],
      default: "STUDENT",
      required: true,
    },
    department: String,
    studentId: String,
    profile: {
      phone: String,
      address: String,
      cgpa: Number,
      familyIncome: Number,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
