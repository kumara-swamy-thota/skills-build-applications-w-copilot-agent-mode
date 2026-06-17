import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/', (req, res) => {
  res.json({ message: 'OctoFit Tracker API is running' });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB (octofit_db)');
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

export default app;
