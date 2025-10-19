import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
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
    rollNo: String,
    profile: {
      phone: String,
      address: String,
      gpa: Number,
      familyIncome: Number,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
