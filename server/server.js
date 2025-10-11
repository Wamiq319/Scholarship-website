import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRoutes } from "./src/routes/index.js";

dotenv.config();
const app = express();
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "scholarship_zone" })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/users", userRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
