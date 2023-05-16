import express from "express";
import {
  createRun,
  downloadRun,
  getAllRuns,
  getRun,
} from "../controllers/runsController.js";

const router = express.Router();

router.get("/api/runs", getAllRuns);
router.get("/api/runs/:studyId/:runId", getRun);
router.post("/api/runs", createRun);
router.get("/api/runs/:studyId/:runId/download", downloadRun);

export default router;
