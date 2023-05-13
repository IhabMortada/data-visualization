// src/components/DownloadButton.js

import React from 'react';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';
import { getStudyRun } from '../services/api';

const DownloadButton = ({ studyId, runId }) => {
  const handleDownload = async () => {
    try {
      const data = await getStudyRun(studyId, runId);
      const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `${studyId}_${runId}.csv`);
    } catch (error) {
      console.error("Error downloading file", error);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleDownload}>
      Download
    </Button>
  );
};

export default DownloadButton;
