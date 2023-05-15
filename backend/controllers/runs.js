// controllers/runs.js
import fs from 'fs';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';
import csv from 'fast-csv';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const dataPath = './data/data.json';


export const getTransformedRuns = async () => {
    const data = await readFile(dataPath, 'utf-8');
    return JSON.parse(data).runs;
}


export const getCurrentFormattedDateTime = () => {
    const date = new Date();

    const formattedDate = `${date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).replace(/\//g, '/')}`;

    const formattedTime = `${date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    })}`;

    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime
}

// Function to get all runs
export const getAllRuns = async (req, res) => {
    try {
        const runs = await getTransformedRuns();
        const sortedRuns = runs.sort((a, b) => new Date(b.RunDate) - new Date(a.RunDate));
        // Send back the data as JSON
        res.status(200).json(sortedRuns);
    } catch (error) {
        // Send an error message if something goes wrong
        res.status(500).json({ message: 'Error getting runs' });
    }
};

// Function to get a specific run
export const getRun = async (req, res) => {
    try {
        const runs = await getTransformedRuns();

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

// Create a new Run
export const createRun = async (req, res) => {
    try {
      const { studyId, studyDate } = req.body;

        const runs = await getTransformedRuns();
        // Filter runs for the current study ID
      const runsForStudy = runs.filter(run =>  run.StudyId === studyId);
        let highestRunIdSuffix = 0;
      if (runsForStudy.length > 0) {
        // Extract the number part of the RunId for the last run
          runsForStudy.forEach(run=>{
              const runIdSuffix = parseInt(run?.RunId?.split('-')[1],10);
                if(runIdSuffix>highestRunIdSuffix){
                    highestRunIdSuffix=runIdSuffix
                }
          })
      }
  
      // Calculate new run id
      const newRunIdNumber = highestRunIdSuffix + 1;
      const newRunId = `${studyId.slice(0, 3)}-${newRunIdNumber.toString().padStart(3, '0')}`;
  

      // Create new run object
      const newRun = {
        StudyId: studyId,
        RunId: newRunId,
        Status: 'Successful',
        RunDate: getCurrentFormattedDateTime(),
        StudyDate: studyDate
      };
  
      // Add new run to runs array and write to file
      runs.push(newRun);
      await writeFile(dataPath, JSON.stringify({ runs }), 'utf-8');
  
      res.status(201).json(newRun);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Function to download a run
export const downloadRun = async (req, res) => {
    try {
        const runs = await getTransformedRuns();

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
        res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');
        const csvStream = csv.format({ headers: true });
        csvStream.pipe(res);
        csvStream.write(run)
        csvStream.end();

    } catch (error) {
        res.status(500).json({ message: 'Error downloading run' });
    }
};
