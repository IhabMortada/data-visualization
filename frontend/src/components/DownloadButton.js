import React from "react"
import { IconButton } from "@mui/material"
import { downloadFile } from "../helpers"
import { downloadStudyRun} from "../services/api"
import { useSnackbar } from "notistack"
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
const DownloadButton = ({ studyId, runId, status }) => {
  const { enqueueSnackbar } = useSnackbar()

  const handleDownload = async () => {
    try {
      const blob = await downloadStudyRun(studyId, runId)

      downloadFile(blob, `${studyId}_${runId}.csv`)

      enqueueSnackbar(`Download ${studyId} was successfully created`, {
        variant: "success",
        autoHideDuration: 2000,
      })
    } catch (error) {
      console.error("Error downloading file", error)
      if (status === "Cancelled")
        enqueueSnackbar(`Run ${runId} is ${status}`, {
          variant: "warning",
          autoHideDuration: 2000,
        })
      else if (status === "Failed")
        enqueueSnackbar(`Run ${runId} is ${status}`, {
          variant: "error",
          autoHideDuration: 2000,
        })
    }
  }

  return (
    <IconButton variant="contained" color="primary"  onClick={handleDownload}>
     <CloudDownloadIcon/>
    </IconButton>

    
  )
}

export default DownloadButton
