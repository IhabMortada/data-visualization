import React, { useState, useEffect } from "react"
import { Container, Box, CircularProgress, Button } from "@mui/material"
import { getRuns, addRun } from "../services/api"
import RunList from "../components/RunList"
import NewRunForm from "../components/NewRunForm"
import { useSnackbar } from "notistack"
import StatisticsChart from "../components/StatisticsChart"

const HomePage = () => {
  const [runs, setRuns] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()

 const fetchRunsData = async () => {
    try {
      const data = await getRuns()
      setRuns(data)
      setIsLoading(false)
    } catch (error) {
      console.log("Error fetching runs", error)
      enqueueSnackbar(
        `List could not be fetched, server failed with ${error.message}`,
        { variant: "error" }
      )
    }
  }

  useEffect(() => {
    fetchRunsData()
  }, [])

  return (
    <Container>
      
      <Box my={4}>
        <NewRunForm addRun={addRun} fetchRunsData={fetchRunsData}/>
      </Box>
      <Box my={4}>
        {isLoading ? <CircularProgress /> : <RunList runs={runs} />}
      </Box>
      
      {/* <Box>
          <StatisticsChart runs={runs} />
        </Box> */}
    </Container>
  )
}

export default HomePage
