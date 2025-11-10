import express from "express";
import {
  createAnnouncement,
  deleteAnnouncementById,
  getAnnouncement,
  getAnnouncements,
} from "../controllers/index.js";

const router = express.Router();

// CRUD Routes
router.post("/", createAnnouncement);
router.get("/", getAnnouncements);
router.get("/:id", getAnnouncement);
router.delete("/:id", deleteAnnouncementById);

export default router;
