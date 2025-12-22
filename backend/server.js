const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware - 
app.use(cors({
  origin: ['https://student-task-manager-amber.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running.....!');
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database is Connected....!'))
  .catch(err => console.log(' MongoDB Connection Error:', err));

// Routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});