// controllers/runs.js
import fs from 'fs';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';


const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const dataPath = './data/data.json';

// Function to get all runs
export const getAllRuns = async (req, res) => {
    try {
        // Read the data.json file
        const data = await readFile(dataPath, 'utf-8');

        // Send back the data as JSON
        res.status(200).json(JSON.parse(data).runs);
    } catch (error) {
        // Send an error message if something goes wrong
        res.status(500).json({ message: 'Error getting runs' });
    }
};

// Function to get a specific run
export const getRun = async (req, res) => {
    try {
        const data = await readFile(dataPath, 'utf-8');
        const runs = JSON.parse(data).runs;

        // Find the run with the matching StudyId and RunId
        const run = runs.find(run => run.StudyId === req.params.studyId && run.RunId === req.params.runId);

        if (!run) {
            return res.status(404).json({ message: 'Run not found' });
        }

        res.status(200).json(run);
    } catch (error) {
        res.status(500).json({ message: 'Error getting run' });
    }
};

// // Function to create a new run
// export const createRun = async (req, res) => {
//     try {
//         const data = await readFile(dataPath, 'utf-8');
//         const runs = JSON.parse(data).runs;

//         // Create a new run with the provided data and a status of "Successful"
//         const newRun = { ...req.body, Status: 'Successful' };

//         // Add the new run to the runs array
//         runs.push(newRun);

//         // Write the updated data back to the file
//         await writeFile(dataPath, JSON.stringify({ runs }), 'utf-8');

//         res.status(201).json(newRun);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating run' });
//     }
// };

// Create a new Run
export const createRun = async (req, res) => {
    try {
      const studyId = req.body.studyId;
      const studyDate = req.body.studyDate;
  
      // Get all runs
      const runs = await getAllRuns();
  
      // Filter runs for the current study ID
      const runsForStudy = runs.filter(run => run.StudyId === studyId);
  
      let lastRunId = '000';
      if (runsForStudy.length > 0) {
        // Extract the number part of the RunId for the last run
        lastRunId = runsForStudy[runsForStudy.length - 1].RunId.split('-')[1];
      }
  
      // Calculate new run id
      const newRunIdNumber = parseInt(lastRunId, 10) + 1;
      const newRunId = `${studyId.slice(0, 3)}-${newRunIdNumber.toString().padStart(3, '0')}`;
  
      const now = new Date();
      const formattedDate = `${now.getFullYear()}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
      // Create new run object
      const newRun = {
        id: uuidv4(),
        StudyId: studyId,
        RunId: newRunId,
        Status: 'Successful',
        RunDate: formattedDate ,
        StudyDate: studyDate
      };
  
      // Add new run to runs array and write to file
      runs.push(newRun);
      await writeRunsToFile(runs);
  
      res.status(201).json(newRun);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Function to download a run
export const downloadRun = async (req, res) => {
    try {
        const data = await readFile(dataPath, 'utf-8');
        const runs = JSON.parse(data).runs;

        // Find the run with the matching StudyId and RunId
        const run = runs.find(run => run.StudyId === req.params.studyId && run.RunId === req.params.runId);

        if (!run) {
            return res.status(404).json({ message: 'Run not found' });
        }

        if (run.Status === 'Failed' || run.Status === 'Cancelled') {
            return res.status(400).json({ message: 'Cannot download a failed or cancelled run' });
        }

        // Send a CSV file as a response
        // The content would be the stringified run object
        // In a real-world scenario, you would probably have a more complex CSV generation logic
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=run.csv');
        res.send(`StudyId,RunId,Status,RunDate,StudyDate\n${run.StudyId},${run.RunId},${run.Status},${run.RunDate},${run.StudyDate}`);
    } catch (error) {
        res.status(500).json({ message: 'Error downloading run' });
    }
};
