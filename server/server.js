import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  userRoutes,
  authRoutes,
  scholarshipRoutes,
} from "./src/routes/index.js";

dotenv.config();
const app = express();
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "scholarship_zone" })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/scholarShip", scholarshipRoutes);

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
