import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  styled,
} from "@mui/material"
import DownloadButton from "./DownloadButton"

const tableHeaders = [
  { key: "studyID", text: "Study ID", sortKey: "StudyId" },
  { key: "runID", text: "Run ID", sortKey: "RunId" },
  { key: "dateOfStudy", text: "Date of Study", sortKey: "StudyDate" },
  { key: "runDate", text: "Run Date", sortKey: "RunDate" },
  { key: "status", text: "Status", sortKey: "Status" },
  { key: "actions", text: "Actions" },
]
//coloring the status
const StatusTableCell = styled(TableCell)(({ theme, status }) => ({
  color:
    status === "Successful"
      ? theme.palette.success.main
      : status === "Failed"
      ? theme.palette.error.main
      : theme.palette.warning.main,
}))

const RunList = ({ runs }) => {
  //sorting the table functions
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState("asc")

  const handleSort = (sortKey) => {
    if (sortKey === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(sortKey)
      setSortOrder("asc")
    }
  }

  const sortedRuns = runs.slice().sort((a, b) => {
    if (!sortBy) {
      return 0
    }
    const cmp = a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0
    return sortOrder === "asc" ? cmp : -cmp
  })

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableCell key={header.key}>
                {header.sortKey ? (
                  <TableSortLabel
                    active={sortBy === header.sortKey}
                    direction={sortOrder}
                    onClick={() => handleSort(header.sortKey)}
                  >
                    {header.text}
                  </TableSortLabel>
                ) : (
                  header.text
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRuns.map((run) => (
            <TableRow key={run.RunId}>
              <TableCell>{run.StudyId}</TableCell>
              <TableCell>{run.RunId}</TableCell>
              <TableCell>{run.StudyDate}</TableCell>
              <TableCell>{run.RunDate}</TableCell>
              <StatusTableCell status={run.Status}>
                {" "}
                {run.Status}
              </StatusTableCell>{" "}
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
