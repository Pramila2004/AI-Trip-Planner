import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db_connection from './db/db_connection.js';
import authRoutes from './routes/auth.js';
import tripRoutes from './routes/trips.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // allow sending cookies/auth headers
}));
app.use(express.json());

// Database Connection
db_connection();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trip', tripRoutes);

// Server listener
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
