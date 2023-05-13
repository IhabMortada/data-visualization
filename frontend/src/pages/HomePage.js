import React, { useState, useEffect } from "react"
import { Container, Box, CircularProgress, Button } from "@mui/material"
import { getRuns, addRun } from "../services/api"
import RunList from "../components/RunList"
import NewRunForm from "../components/NewRunForm"

const HomePage = () => {
  const [runs, setRuns] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchRunsData = async () => {
    try {
      const data = await getRuns()
      setRuns(data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching runs", error)
    }
  }

  useEffect(() => {
    fetchRunsData()
  }, [])

  return (
    <Container>
      <Box my={4}>
        <NewRunForm addRun={addRun} refreshRuns={fetchRunsData} />
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
