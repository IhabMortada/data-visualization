import React from "react";
import {
  Chip,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import DownloadButton from "./DownloadButton";
import colors from "../styles/colors";
import "../styles/styles.css";
import { useTable } from "../hooks/use-table";

const tableHeaders = [
  { columnId: "StudyId", text: "Study ID" },
  { columnId: "RunId", text: "Run ID" },
  { columnId: "StudyDate", text: "Date of Study" },
  { columnId: "RunDate", text: "Run Date" },
  { columnId: "Status", text: "Status" },
  { columnId: "actions", text: "Actions" },
];

//coloring the status
const StatusTableCell = styled(Chip)(({ theme, status }) => ({
  alignSelf: "center",
  backgroundColor:
    status === "Successful"
      ? theme.palette.success.light
      : status === "Failed"
      ? theme.palette.error.light
      : theme.palette.warning.light,
}));

const RunList = ({ runs }) => {
  const {
    page,
    rowsPerPage,
    sortBy,
    sortOrder,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
    paginatedSortedRuns,
  } = useTable(runs);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableCell
                key={header.columnId}
                className="table-header"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: colors.primary,
                  color: "#fff",
                }}
              >
                {header.columnId ? (
                  <TableSortLabel
                    active={sortBy === header.columnId}
                    direction={sortOrder}
                    onClick={() => handleSort(header.columnId)}
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
          {paginatedSortedRuns.map((run) => (
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
                <DownloadButton
                  studyId={run.StudyId}
                  runId={run.RunId}
                  status={run.Status}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={runs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default RunList;
