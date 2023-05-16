import express from "express";
import {
  createRun,
  getAllRuns,
  getRun,
} from "../controllers/runsController.js";
import { downloadRun } from "../controllers/downloadController.js";
const router = express.Router();

router.get("/api/runs", getAllRuns);
router.get("/api/runs/:studyId/:runId", getRun);
router.post("/api/runs", createRun);
router.get("/api/runs/:studyId/:runId/download", downloadRun);

export default router;
