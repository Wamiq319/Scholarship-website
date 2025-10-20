import express from "express";
import { AllUserGet, deleteUser, UserGetById } from "../controllers/index.js";

const router = express.Router();

router.get("/", AllUserGet);
router.get("/:id", UserGetById);
router.delete("/:id", deleteUser);

export default router;
