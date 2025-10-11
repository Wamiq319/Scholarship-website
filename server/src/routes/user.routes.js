import express from "express";
import { registerUser } from "../controllers/index.js";

const router = express.Router();

// POST /api/users/register
router.post("/register", registerUser);

export default router;
