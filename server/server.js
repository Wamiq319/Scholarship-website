import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import {
  userRoutes,
  authRoutes,
  scholarshipRoutes,
} from "./src/routes/index.js";

dotenv.config();
const app = express();

// CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    console.log("Request Origin:", origin);
    const allowedOrigins = process.env.ALLOWED_ORIGINS;
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
  const { method, originalUrl, body } = req;
  console.log(`
--- Incoming Request ---`);
  console.log(`[${new Date().toISOString()}] ${method} ${originalUrl}`);
  if (body && Object.keys(body).length > 0) {
    console.log("Request Body:", body);
  }

  res.on("finish", () => {
    console.log("--- Response Sent ---");
    console.log(
      `[${new Date().toISOString()}] Status: ${res.statusCode} ${
        res.statusMessage
      }`
    );
    console.log("--------------");
  });

  next();
});

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
