import csv from "fast-csv"
import { getTransformedRuns } from "../utils/utils.js"

 
export const downloadRun = async (req, res) => {
  try {
    const runs = await getTransformedRuns()
    const run = runs.find(
      (run) =>
        run.StudyId === req.params.studyId && run.RunId === req.params.runId
    )

    if (!run) {
      return res.status(404).json({ message: "Run not found" })
    }

    if (run.Status === "Failed" || run.Status === "Cancelled") {
      return res
        .status(400)
        .json({ message: `Cannot download a ${run.Status} run` })
    }

    // Send a CSV file as a response
    res.setHeader("Content-Type", "text/csv")
    res.setHeader("Content-Disposition", 'attachment; filename="data.csv"')
    const csvStream = csv.format({ headers: true })
    csvStream.pipe(res)
    csvStream.write(run)
    csvStream.end()
  } catch (error) {
    res.status(500).json({ message: "Error downloading run" })
  }
}
