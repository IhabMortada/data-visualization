import { useState } from "react";

export const useTable = (runs) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSort = (columnId) => {
    if (columnId === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnId);
      setSortOrder("asc");
    }
  };

  const sortedRuns = runs.slice().sort((a, b) => {
    if (!sortBy) {
      return 0;
    }
    const cmp = a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0;
    return sortOrder === "asc" ? cmp : -cmp;
  });

  const paginatedSortedRuns = sortedRuns.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
    sortedRuns,
    paginatedSortedRuns,
  };
};
