// server.js
import express from 'express';
import runsRoutes from './routes/runsRoutes.js';

const app = express();
app.use(express.json());

app.use('/', runsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
