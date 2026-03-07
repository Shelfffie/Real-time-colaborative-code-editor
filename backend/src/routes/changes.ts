import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Sessions endpoint" });
});

export default router;
