import express from "express";
import {
  AllScholarshipsGet,
  create,
  Delete,
  scholarshipGetById,
  update,
} from "../controllers/index.js";

const router = express.Router();

router.get("/", AllScholarshipsGet);
router.get("/:id", scholarshipGetById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", Delete);

export default router;
