const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running.....!');
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database is Connected....!'))
  .catch(err => console.log(' MongoDB Connection Error:', err));

// Basic route

// Routes
const taskRoutes = require('./routes/taskRoutes')
app.use('/api/tasks', taskRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});