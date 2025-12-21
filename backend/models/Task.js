const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // createdAt aur updatedAt automatically add karega
});

module.exports = mongoose.model('Task', taskSchema);