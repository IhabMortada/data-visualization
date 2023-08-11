# Company Shared Services: Data Science Hub

This is a project I completed as part of the application process for the Full Stack Developer position at a Company's Data Science Hub. The project involved implementing a web application that interacts with an AI model for analyzing images of human skin in the context of consumer studies. The application was built using React for the front-end and Node.js for the back-end.

## Project Overview

The goal of this project was to create a simple web application that allows users to trigger the AI model and visualize the results. The application reads and writes data to a JSON file (`data.json`) to simulate interaction with a database.

## Tech Stack

- Front-end: React (JavaScript framework)
- Back-end: Node.js

## Implementing the Single Page Application (SPA)

To complete this task, I implemented a Single Page Application with the following features:

- Header: I designed a creative header with a logo, title, menu, and profile settings to enhance the visual appeal of the application.

- Visualization of Latest Run Details: The application displays the details of the latest run for all StudyIds in an interactive table using the MUI Library. Users can list, paginate and sort the information as desired. The displayed information includes the RunId, StudyDate, RunDate, and Status.

- A pie chart shows an insight of the number of Runs by Status.

- Download Functionality: Users can download a CSV file for a specific study run depending on StudyId and RunId. The backend generates the CSV file, and the application creates a notification for runs with a status of "Failed" or "Canceled".

- Refresh/Reload Button: The application includes a button that allows users to refresh or reload the runs.

- New Study Run: In addition to the features implemented in Task 1, I added functionality to trigger a new study run. Users can provide the StudyId and StudyDate for the new run. The application generates a RunId based on the StudyId and other conditions. Upon submitting the run, the application updates the data in the `data.json` file and refreshes the UI. Newly submitted study runs immediately enter the "Successful" state.

 

## Instructions for Running the Application

To run the application locally, please follow these steps:

1. Make sure you have Node.js installed on your machine.

2. Backend Setup:
   - Navigate to the project directory in your terminal to the backend folder.
   - Install the dependencies by running the command: `npm install`.
   - Start the development server with the command: `npm start` or `nodemon server`.
   - The server will run by default on `http://localhost:3008` (if you want to change it, you should update it as well in `frontend/config.js`).

3. Frontend Setup:
   - Navigate to the project directory in your terminal to the frontend folder.
   - Install the dependencies by running the command: `npm install`.
   - Run the React project with the command: `npm start`.
   - Access the application by opening your web browser and visiting the URL: `http://localhost:3000` (make sure this port is not used by another application on your local machine).

## Finally

Both tasks have been completed as outlined in the project requirements with some enhancements. You can find the source code for the project in the provided files.
