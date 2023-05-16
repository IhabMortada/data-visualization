import express from 'express';
import runsRoutes from './routes/runsRoutes.js';
import protectConcurrentRequests from './middleware/protectConcurrentRequests.js';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors());
app.use('/', runsRoutes);

const PORT = process.env.PORT || 3008;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
