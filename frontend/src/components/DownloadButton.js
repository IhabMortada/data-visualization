import React from "react";
import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { downloadFileFromBlob } from "../helpers";
import { downloadStudyRun } from "../services/api";

const DownloadButton = ({ studyId, runId, status }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDownload = async () => {
    try {
      const blob = await downloadStudyRun(studyId, runId);
      downloadFileFromBlob(blob, `${studyId}_${runId}.csv`);
      enqueueSnackbar(`Download ${studyId} was successfully created`, {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch (error) {
      const errorMessage =
        status === "Cancelled" || status === "Failed"
          ? `download could not be created for status ${status}`
          : "Download could not be created, server failed";

      const errorVariant = status === "Failed" ? "error" : "warning";

      enqueueSnackbar(errorMessage, {
        variant: errorVariant,
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <IconButton variant="contained" color="primary" onClick={handleDownload}>
      <CloudDownloadIcon />
    </IconButton>
  );
};

export default DownloadButton;
