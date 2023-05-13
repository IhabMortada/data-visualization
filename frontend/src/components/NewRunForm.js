import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';



const NewRunForm = ({ addRun }) => {
  const [studyId, setStudyId] = useState('');
  const [studyDate, setStudyDate] = useState('');

  const handleSubmit = (event) => {
    // event.preventDefault();
    const runData = { studyId, studyDate };
    addRun(runData);
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
          <Button type="submit" variant="contained" color="primary">
            Add New Run
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default NewRunForm;
