import React from 'react';
import { Button } from '@mui/material';


const RefreshButton = ({ refreshData }) => {
  // refreshData would be a function passed as a prop from parent component, 
  // which refreshes the run data when this button is clicked.
  
  return (
    <Button variant="contained" color="secondary" onClick={refreshData}>
      Refresh
    </Button>
  );
}

export default RefreshButton;
