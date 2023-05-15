// // api.js

// import axios from 'axios';

// export const fetchRuns = async () => {
//   const response = await axios.get('/runs');
//   return response.data;
// };

// export const addRun = async () => {
    
//   };
  
  
// src/services/api.js

import axios from 'axios';

const baseUrl = 'http://localhost:3001'; // Make sure to replace this with your actual server's base URL

export const getRuns = async () => {
  try {
    const response = await axios.get(`/runs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching runs", error);
    throw error;
  }
};

export const addRun = async (runData) => {
  try {
    const response = await axios.post(`/runs`, runData);
    return response.data;
  } catch (error) {
    console.error("Error adding run", error);
    throw error;
  }
};

export const getStudyRun = async (studyId, runId) => {
  const { data } = await axios.get(`/runs/${studyId}/${runId}`);
  return data;
};

export const downloadStudyRun = async (studyId, runId) => {
  const { data } = await axios.get(`/runs/${studyId}/${runId}/download`, {
    responseType: 'blob',
    headers: { 'Content-Type': 'multipart/form-data' },

  });
  console.log('data',data)
  return data;
}