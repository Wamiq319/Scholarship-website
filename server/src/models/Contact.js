import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    readBy: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },

  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
