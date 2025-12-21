import { useState } from 'react';
import axios from 'axios';
import { FaPlus, FaCalendarAlt, FaFlag } from 'react-icons/fa';

const AddTaskForm = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/tasks', formData);
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
      });
      onTaskAdded();
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-form-container">
      <div className="form-header">
        <h2>➕ Create New Task</h2>
        <p>Add a new task to your list</p>
      </div>

      <form onSubmit={handleSubmit} className="modern-form">
        <div className="input-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="What needs to be done?"
            value={formData.title}
            onChange={handleChange}
            required
            className="modern-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Add details, notes, or instructions..."
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="modern-textarea"
          />
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="priority">
              <FaFlag className="icon" /> Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="modern-select"
            >
              <option value="low"> Low Priority</option>
              <option value="medium"> Medium Priority</option>
              <option value="high"> High Priority</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="dueDate">
              <FaCalendarAlt className="icon" /> Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="modern-input"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="submit-btn"
        >
          <FaPlus />
          {loading ? 'Adding Task...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;