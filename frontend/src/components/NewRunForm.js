import React, { useState } from "react";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import SyncIcon from "@mui/icons-material/Sync";

const NewRunForm = ({ addRun, fetchRunsData }) => {
  const [studyId, setStudyId] = useState("");
  const [studyDate, setStudyDate] = useState("");
  const [isAddRunLoading, setIsAddRunLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsAddRunLoading(true);
    const runData = { studyId, studyDate };
    try {
      await addRun(runData);
      enqueueSnackbar(
        `An item with the study ID ${studyId} got successfully created`,
        { variant: "success" }
      );
    } catch (error) {
      enqueueSnackbar(`Item could not be added, Error: ${error.message}`, {
        variant: "error",
      });
    } finally {
      setIsAddRunLoading(false);
      setStudyId("");
      setStudyDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="studyId"
            name="studyId"
            label="Study ID"
            fullWidth
            value={studyId}
            onChange={(e) => setStudyId(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="studyDate"
            name="studyDate"
            label="Study Date"
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={studyDate}
            onChange={(e) => setStudyDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isAddRunLoading}
          >
            Add New Run
          </Button>
          <IconButton color="primary" onClick={fetchRunsData}>
            <SyncIcon />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewRunForm;
