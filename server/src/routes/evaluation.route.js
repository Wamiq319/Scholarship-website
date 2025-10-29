import express from "express";

import { createEvaluation, evaluatedById } from "../controllers/index.js";

const router = express.Router();

router.post("/", createEvaluation);
router.get("/:id", evaluatedById);

export default router;
