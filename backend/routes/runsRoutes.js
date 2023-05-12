// routes/routes.js
import express from 'express';
import { getAllRuns, getRun, createRun, downloadRun } from '../controllers/runs.js';

const router = express.Router();

router.get('/runs', getAllRuns);
router.get('/runs/:studyId/:runId', getRun);
router.post('/runs', createRun);
router.get('/runs/:studyId/:runId/download', downloadRun);

export default router;
