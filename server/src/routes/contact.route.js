import express from "express";
import { createContactMessage, fetchAllContacts } from "../controllers/index.js";

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", fetchAllContacts);

export default router;
