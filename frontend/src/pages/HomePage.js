import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import { addRun, getRuns } from "../services/api";
import RunList from "../components/RunList";
import NewRunForm from "../components/NewRunForm";
import { useSnackbar } from "notistack";
import StatisticsChart from "../components/StatisticsChart";

const HomePage = () => {
  const [runs, setRuns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const fetchRunsData = async () => {
    try {
      const data = await getRuns();
      setRuns(data);
      setIsLoading(false);
    } catch (error) {
      enqueueSnackbar(
        `List could not be fetched, server failed with ${error.message}`,
        { variant: "error" }
      );
    }
  };

  useEffect(() => {
    fetchRunsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runs?.length]);

  const addRunWithState = async (data) => {
    setIsLoading(true);
    try {
      setRuns([...runs, data]);
      await addRun(data);
    } catch (error) {
      enqueueSnackbar(
        `Run could not be added, server failed with ${error.message}`,
        { variant: "error" }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Box
        my={4}
        sx={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NewRunForm addRun={addRunWithState} fetchRunsData={fetchRunsData} />
        <StatisticsChart runs={runs} />
      </Box>
      <Box my={4}>
        {isLoading ? <CircularProgress /> : <RunList runs={runs} />}
      </Box>
    </Container>
  );
};

export default HomePage;
