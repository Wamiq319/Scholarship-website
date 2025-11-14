import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";
import {
  userRoutes,
  authRoutes,
  scholarshipRoutes,
  applicationRoutes,
  evaluationRoutes,
  announcementRoutes,
  contactRoutes,
  unreadRoutes,
} from "./src/routes/index.js";
import { deactivateExpiredScholarships } from "./src/utils/index.js";
import connectDB from "./src/utils/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cookieParser());
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

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
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

cron.schedule("* * * * *", deactivateExpiredScholarships);

// Routes
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/evaluations", evaluationRoutes);
app.use("/api/announcement", announcementRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/unreadCount", unreadRoutes);

// Server Start
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to connect DB, Server not started");
    process.exit(1);
  }
};

startServer();
