import express from "express";
import {
  createAnnouncement,
  deleteAnnouncementById,
  getAnnouncement,
  getAnnouncements,
  updateAnnouncdment,
} from "../controllers/index.js";
import { protectRoute } from "../middleware/index.js";

const router = express.Router();

// CRUD Routes
router.post("/", createAnnouncement);
router.put("/:id", updateAnnouncdment);
router.get("/", protectRoute, getAnnouncements);
router.get("/:id", getAnnouncement);
router.delete("/:id", deleteAnnouncementById);

export default router;
