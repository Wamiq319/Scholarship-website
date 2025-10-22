import express from "express";
import { deleteApplication, getApplications, ScholarshipApply, updateApplication } from "../controllers/index.js";

const router = express.Router();

router.post("/apply", ScholarshipApply);
router.get("/", getApplications);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;
