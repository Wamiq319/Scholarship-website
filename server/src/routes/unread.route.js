import express from "express";
import { getUnreadCount } from "../controllers/index.js";
import { protectRoute } from "../middleware/index.js";

const router = express.Router();

router.get("/", protectRoute, getUnreadCount);

export default router;
