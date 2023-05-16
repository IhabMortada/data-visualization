import fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);
const dataPath = "./data/data.json";

export const getTransformedRuns = async () => {
  const data = await readFile(dataPath, "utf-8");
  return JSON.parse(data).runs;
};

export const getCurrentFormattedDateTime = () => {
  const now = new Date();

  // change date format to: yyyy/mm/dd hh:mm
  const formattedDate = `${now.getFullYear()}/${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${now.getDate().toString().padStart(2, "0")} ${now
    .getHours()
    .toString()
    .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  return formattedDate;
};

export const getNewRunId = (runs, studyId) => {
  // Filter runs for the current study ID
  const runsForStudy = runs.filter((run) => run.StudyId === studyId);
  let highestRunIdSuffix = 0;
  if (runsForStudy.length > 0) {
    // Extract the number part of the RunId for the last run
    runsForStudy.forEach((run) => {
      const runIdSuffix = parseInt(run?.RunId?.split("-")[1], 10);
      if (runIdSuffix > highestRunIdSuffix) {
        highestRunIdSuffix = runIdSuffix;
      }
    });
  }

  // Calculate new run id
  const newRunIdNumber = highestRunIdSuffix + 1;
  const newRunId = `${studyId.slice(0, 3)}-${newRunIdNumber
    .toString()
    .padStart(3, "0")}`;

  return newRunId;
};
