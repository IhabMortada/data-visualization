import axios from "axios"

import { serverURL } from "./config"
export const getRuns = async () => {
  try {
    const response = await axios.get(`${serverURL}/runs`)
    return response.data
  } catch (error) {
    console.error("Error fetching runs", error)
    throw error
  }
}

export const addRun = async (runData) => {
  try {
    const { data } = await axios.post(`${serverURL}/runs`, runData)
    return data
  } catch (error) {
    console.error("Error adding run", error)
    throw error
  }
}

export const getStudyRun = async (studyId, runId) => {
  const { data } = await axios.get(`${serverURL}/runs/${studyId}/${runId}`)
  return data
}

export const downloadStudyRun = async (studyId, runId) => {
  const { data } = await axios.get(
    `${serverURL}/runs/${studyId}/${runId}/download`,
    {
      responseType: "blob",
      headers: { "Content-Type": "multipart/form-data" },
    }
  )
  return data
}
