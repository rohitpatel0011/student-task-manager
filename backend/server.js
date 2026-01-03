const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware - CORS
app.use(cors({
  origin: ['https://insatask.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));j

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running.....!');
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Database is Connected....!'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// Import routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔐 JWT Secret: ${process.env.JWT_SECRET ? 'Set' : 'Not set!'}`);
});