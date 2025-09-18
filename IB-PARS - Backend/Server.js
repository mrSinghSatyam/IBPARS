import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';  // Import the fileURLToPath from 'url' module

import reportRoutes from './Routes/reportRoutes.js';
import authRoutes from './Routes/authRoutes.js';

const app = express();

// Get the current directory of the file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware Setup
app.use(cors());
app.use(express.json());

// Serve static files (for profile images or other media)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/ibpars')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('API is live');
});

// Start the Server
const PORT = process.env.PORT || 5000; // Allow dynamic port or default to 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
