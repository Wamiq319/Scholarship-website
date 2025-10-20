import express from "express";
import { ScholarshipApply } from "../controllers/index.js";

const router = express.Router();

router.post("/apply", ScholarshipApply);

export default router;
