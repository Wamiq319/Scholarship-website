import express from "express";
import {
  ApplicationGetById,
  deleteApplication,
  getApplications,
  ScholarshipApply,
  updateApplication,
} from "../controllers/index.js";

const router = express.Router();

router.post("/apply", ScholarshipApply);
router.get("/", getApplications);
router.get("/:id", ApplicationGetById);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;
