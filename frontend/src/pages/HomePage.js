import React, { useState, useEffect } from "react"
import { Container, Box, CircularProgress, Button } from "@mui/material"
import { getRuns, addRun } from "../services/api"
import RunList from "../components/RunList"
import NewRunForm from "../components/NewRunForm"
import { useSnackbar } from 'notistack';

const HomePage = () => {
  const [runs, setRuns] = useState([])
  const [isLoading, setIsLoading] = useState(true)
    const { enqueueSnackbar,closeSnackbar } = useSnackbar();

  const fetchRunsData = async () => {
    try {
      const data = await getRuns()
      setRuns(data)
      setIsLoading(false)
    } catch (error) {
      console.log("Error fetching runs", error)
      enqueueSnackbar(`List could not be fetched, server failed with ${error.message}`, { variant: 'error' });
    }
  }

  useEffect(() => {
      fetchRunsData();
          return () => {
              closeSnackbar()
          }
  }, [runs?.length])




  return (
    <Container>
      <Box my={4}>
        <NewRunForm addRun={async (data)=> {
            await addRun(data);
            // this changes runs so useEffect is called again
            setRuns([...runs,data]);
        }}
        />
      </Box>
      <Box my={4}>
        {isLoading ? <CircularProgress /> : <RunList runs={runs} />}
      </Box>
      <Box my={4}>
        <Button variant="contained" color="primary" onClick={fetchRunsData}>
          Refresh
        </Button>
      </Box>
    </Container>
  )
}

export default HomePage
