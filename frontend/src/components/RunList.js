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

// just enhancement to make the code inside return
// readability easier
// same in line 41
const tableHeaders = [
  {key:'studyID',text:'Study ID'},
  {key:'runID',text:'Run ID'},
  {key:'dateOfStudy',text:'Date of Study'},
  {key:'runDate',text:'Run Date'},
  {key:'status',text:'Status'},
  {key:'actions',text:'Actions'},
];

const RunList = ({ runs }) => {
  if (!runs || runs.length === 0) {
    return <p>No runs available at the moment.</p>
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeaders.map(headerText=><TableCell key={headerText.key}>{headerText.text}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {runs.map((run) => (
            <TableRow key={run.RunId}>
              {Object.keys(run).map(key=><TableCell key={key}>{run[key]}</TableCell>)}
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
