import express from "express";
import {
  createContactMessage,
  fetchAllContacts,
} from "../controllers/index.js";
import { protectRoute } from "../middleware/index.js";

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", protectRoute, fetchAllContacts);

export default router;
