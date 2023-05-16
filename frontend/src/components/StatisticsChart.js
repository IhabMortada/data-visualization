// import React from "react";
// import { Bar } from "react-chartjs-2";
 
// const StatisticsChart = ({ runs }) => {
//   // Extract the required data for the chart
//   const studyIds = runs.map((run) => run.StudyId);
//   const successfulRuns = runs.filter((run) => run.Status === "Successful").length;
//   const failedRuns = runs.filter((run) => run.Status === "Failed").length;
//   const cancelledRuns = runs.filter((run) => run.Status === "Cancelled").length;

//   // Prepare the data for the chart
//   const data = {
//     labels: studyIds,
//     datasets: [
//       {
//         label: "Successful",
//         data: [successfulRuns],
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//       {
//         label: "Failed",
//         data: [failedRuns],
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//       {
//         label: "Cancelled",
//         data: [cancelledRuns],
//         backgroundColor: "rgba(54, 162, 235, 0.2)",
//         borderColor: "rgba(54, 162, 235, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           precision: 0,
//         },
//       },
//     },
//   };

//   return (
//     <div>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default StatisticsChart;
