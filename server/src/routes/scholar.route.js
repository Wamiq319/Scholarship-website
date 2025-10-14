import express from "express";
import {
  create,
  Delete,
  getAll,
  getById,
  update,
} from "../controllers/scholar.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", Delete);

export default router;
