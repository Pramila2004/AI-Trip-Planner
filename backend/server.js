import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import db_connection from './db/db_connection.js';
import authRoutes from './routes/auth.js';
import tripRoutes from './routes/trips.js';

// Load environment variables
dotenv.config();

// Allowed frontend origins
const allowedOrigins = [
  'http://localhost:3000',                  // Dev
  'https://trip-planner-l8g7.onrender.com', // Prod
];

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Connect to MongoDB
db_connection();

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/trip', tripRoutes);

// Serve React in production
if (process.env.NODE_ENV === 'production') {
  // __dirname workaround for ESM
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Serve static assets
  app.use(express.static(path.join(__dirname, '../client/build')));

  // All other requests return the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
