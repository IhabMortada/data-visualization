import React from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import colors from "../styles/colors";
import { Box } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Title, Legend);

export const StatisticsChart = ({ runs }) => {
  // Extract the required data for the chart
  const studyIds = runs.map((run) => run.Status);
  const uniqueStudyIds = [...new Set(studyIds)];

  const successfulRuns = runs.filter(
    (run) => run.Status === "Successful"
  ).length;
  const failedRuns = runs.filter((run) => run.Status === "Failed").length;
  const cancelledRuns = runs.filter((run) => run.Status === "Cancelled").length;

  // Prepare the data for the chart
  const data = {
    labels: uniqueStudyIds,
    datasets: [
      {
        label: "# of Runs",
        data: [successfulRuns, failedRuns, cancelledRuns],
        backgroundColor: [colors.primary, colors.error, colors.warning],
        borderColor: [colors.primary, colors.error, colors.warning],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable default legend display
      },
      title: {
        display: true,
        position: "bottom",
        text: "Runs Status Insights",
        font: { size: 16 },
      },
    },
  };

  return (
    <Box
      sx={{
        width: 350,
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: 1,
        p: 2,
      }}
    >
      <Pie data={data} options={options} />
      <Box>
        {data.labels.map((label, index) => (
          <Box
            key={index}
            sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}
          >
            <Box
              sx={{
                display: "flex",
                width: 20,
                height: 20,
                backgroundColor: data.datasets[0].backgroundColor[index],
              }}
            ></Box>
            <span style={{ marginLeft: "15px" }}>{label}</span>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default StatisticsChart;
