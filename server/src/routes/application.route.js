import express from "express";
import {
  ApplicationGetById,
  deleteApplication,
  getApplications,
  ScholarshipApply,
  updateApplication,
} from "../controllers/index.js";
import { protectRoute } from "../middleware/index.js";

const router = express.Router();

router.post("/apply", ScholarshipApply);
router.get("/", protectRoute, getApplications);
router.get("/:id", ApplicationGetById);
router.put("/:id", updateApplication);
router.delete("/:id", protectRoute, deleteApplication);

export default router;
