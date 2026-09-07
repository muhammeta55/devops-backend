require('dotenv').config();
const mongoose = require('mongoose');
const Word = require('./models/Word');
const express = require('express');
const wordsRouter = require('./routes/words');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// PORT is read from environment variable, with a safe local default.
// In production this will come from the server's environment, not from code.
const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || '1.0.0';
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(express.json());

// GET / -> confirms the app is running
app.get('/', (req, res) => {
  res.json({ message: 'Backend application is running' });
});

// GET /api/health -> used by the CI/CD pipeline after each deployment
// to verify the restarted service actually came back up
app.get('/api/health', (req, res) => {
  res.json({ status: 'UP' });
});

// GET /api/info -> metadata about the running application
app.get('/api/info', (req, res) => {
  res.json({
    application: 'Backend Application - Auto Deployed via CI/CD',
    version: APP_VERSION,
    environment: NODE_ENV,
  });
});

app.use('/api/words', wordsRouter);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

  
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT} (env: ${NODE_ENV})`);
});