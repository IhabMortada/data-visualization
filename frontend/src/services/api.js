import { axiosClient } from "./config";

export const getRuns = async () => {
  const { data } = await axiosClient.get(`/runs`);
  return data;
};

export const addRun = async (runData) => {
  const { data } = await axiosClient.post(`/runs`, runData);
  return data;
};

export const downloadStudyRun = async (studyId, runId) => {
  const { data } = await axiosClient.get(`/runs/${studyId}/${runId}/download`, {
    responseType: "blob",
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
