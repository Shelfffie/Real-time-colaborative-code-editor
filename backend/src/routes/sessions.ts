import express from "express";
import { createCodeSession } from "../controllers/code_controller";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Sessions endpoint" });
});

router.post("/code", createCodeSession);

export default router;
