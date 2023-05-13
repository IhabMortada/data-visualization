import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"
import DownloadButton from "./DownloadButton"

const RunList = ({ runs }) => {
  if (!runs || runs.length === 0) {
    return <p>No runs available at the moment.</p>
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Study ID</TableCell>
            <TableCell>Run ID</TableCell>
            <TableCell>Date of Study</TableCell>
            <TableCell>Run Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {runs.map((run) => (
            <TableRow key={run.RunId}>
              <TableCell>{run.StudyId}</TableCell>
              <TableCell>{run.RunId}</TableCell>
              <TableCell>{run.StudyDate}</TableCell>
              <TableCell>{run.RunDate}</TableCell>
              <TableCell>{run.Status}</TableCell>
              <TableCell>
                <DownloadButton studyId={run.StudyId} runId={run.RunId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RunList
