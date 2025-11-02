import express from "express";

import { createEvaluation, evaluatedById, getEvaluations } from "../controllers/index.js";

const router = express.Router();


router.get("/", getEvaluations)
router.post("/", createEvaluation);
router.get("/:id", evaluatedById);

export default router;
