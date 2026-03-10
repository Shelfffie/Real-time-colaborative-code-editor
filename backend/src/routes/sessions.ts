import express from "express";
import {
  createCodeSession,
  getCodeSession,
} from "../controllers/code_controller";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Sessions endpoint" });
});

router.post("/", createCodeSession);

router.get("/:id", getCodeSession);

export default router;
