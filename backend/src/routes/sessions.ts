import express from "express";
import {
  createCodeSession,
  getCodeSession,
  handleConnection,
  handleCheking,
} from "../controllers/code_controller";
import { getVersion, getSessionHistory } from "../controllers/version_control";

const router = express.Router();

router.post("/", createCodeSession);

router.get("/:id", getCodeSession);

router.get("/:id/version", getSessionHistory);

router.get("/:id/version/:version", getVersion);

router.get("/:id/status", handleConnection);

router.post("/:id/checking", handleCheking);

export default router;
