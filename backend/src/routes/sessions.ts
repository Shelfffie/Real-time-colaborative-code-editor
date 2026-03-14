import express from "express";
import {
  createCodeSession,
  getCodeSession,
  saveChanges,
} from "../controllers/code_controller";
import { getVersion, getSessionHistory } from "../controllers/version_control";

const router = express.Router();

router.post("/", createCodeSession);

router.post("/:id", saveChanges);

router.get("/:id", getCodeSession);

router.get("/:id/version", getSessionHistory);

router.get("/:id/version/:version", getVersion);

export default router;
