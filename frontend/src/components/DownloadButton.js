// src/components/DownloadButton.js

import React from 'react';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';
import {downloadFile}from '../helpers'
import {downloadStudyRun, getStudyRun} from '../services/api';

const DownloadButton = ({ studyId, runId }) => {
  const handleDownload = async () => {
    try {
     const blob = await downloadStudyRun(studyId, runId);
      return downloadFile(blob,`${studyId}_${runId}.csv`);
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
