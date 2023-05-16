import fs from "fs"
import { promisify } from "util"

const readFile = promisify(fs.readFile)
const dataPath = "./data/data.json"

export const getTransformedRuns = async () => {
  const data = await readFile(dataPath, "utf-8")
  return JSON.parse(data).runs
}

export const getCurrentFormattedDateTime = () => {
  const now = new Date()
  const formattedDate = `${now.getFullYear()}/${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${now.getDate().toString().padStart(2, "0")} ${now
    .getHours()
    .toString()
    .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
  return formattedDate
}
