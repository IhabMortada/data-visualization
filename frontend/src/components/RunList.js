import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TableSortLabel,
  styled,
} from "@mui/material"
import DownloadButton from "./DownloadButton"
import colors from "../styles/colors"
import "../styles/styles.css"

const tableHeaders = [
  { key: "studyID", text: "Study ID", sortKey: "StudyId" },
  { key: "runID", text: "Run ID", sortKey: "RunId" },
  { key: "dateOfStudy", text: "Date of Study", sortKey: "StudyDate" },
  { key: "runDate", text: "Run Date", sortKey: "RunDate" },
  { key: "status", text: "Status", sortKey: "Status" },
  { key: "actions", text: "Actions" },
]

//coloring the status
const StatusTableCell = styled(Chip)(({ theme, status }) => ({
  alignSelf: "center",
  backgroundColor:
    status === "Successful"
      ? theme.palette.success.light
      : status === "Failed"
      ? theme.palette.error.light
      : theme.palette.warning.light,
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
              <TableCell
                key={header.key}
                className="table-header"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: colors.primary,
                  color: "#fff",
                }}
              >
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
            <TableRow
              key={run.RunId}
              sx={{
                "&:nth-of-type(even)": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <TableCell>{run.StudyId}</TableCell>
              <TableCell>{run.RunId}</TableCell>
              <TableCell>{run.StudyDate}</TableCell>
              <TableCell>{run.RunDate}</TableCell>
              <TableCell>
                <StatusTableCell
                  status={run.Status}
                  label={run.Status}
                  size="small"
                />
              </TableCell>

              <TableCell>
                <DownloadButton studyId={run.StudyId} runId={run.RunId} status={run.Status}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RunList
