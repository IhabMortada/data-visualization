import fs from "fs"
import { promisify } from "util"
import {
  getCurrentFormattedDateTime,
  getNewRunId,
  getTransformedRuns,
} from "../utils/utils.js"

const writeFile = promisify(fs.writeFile)

const dataPath = "./data/data.json"

export const getAllRuns = async (req, res) => {
  try {
    const runs = await getTransformedRuns()
    const sortedRuns = runs.sort(
      (a, b) => new Date(b.RunDate) - new Date(a.RunDate)
    )
    res.status(200).json(sortedRuns)
  } catch (error) {
    res.status(500).json({ message: "Error getting runs" })
  }
}

// Not used in current scope.
export const getRun = async (req, res) => {
  try {
    const runs = await getTransformedRuns()

    // Find the run with the matching StudyId and RunId
    const run = runs.find(
      (run) =>
        run.StudyId === req.params.studyId && run.RunId === req.params.runId
    )

    if (!run) {
      return res.status(404).json({ message: "Run not found" })
    }
    res.status(200).json(run)
  } catch (error) {
    res.status(500).json({ message: "Error getting run" })
  }
}

export const createRun = async (req, res) => {
  try {
    const { studyId, studyDate } = req.body

    const runs = await getTransformedRuns()

    const newRunId = getNewRunId(runs, studyId)
    // Create new run object
    const newRun = {
      StudyId: studyId,
      RunId: newRunId,
      Status: "Successful",
      RunDate: getCurrentFormattedDateTime(),
      StudyDate: studyDate,
    }

    // Add new run to runs array and write to file
    runs.push(newRun)
    await writeFile(dataPath, JSON.stringify({ runs }), "utf-8")

    res.status(201).json(newRun)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
