import { useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { format, isAfter } from 'date-fns';
import { API_ENDPOINTS } from '../config/api';

const TaskCard = ({ task, onTaskUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...task });

  const toggleComplete = async () => {
    try {
      await axios.put(`${API_ENDPOINTS.TASKS}/${task._id}`, {
        ...task,
        completed: !task.completed
      });
      onTaskUpdated();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this task permanently?')) {
      try {
        await axios.delete(`${API_ENDPOINTS.TASKS}/${task._id}`);
        onTaskUpdated();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`${API_ENDPOINTS.TASKS}/${task._id}`, editData);
      setIsEditing(false);
      onTaskUpdated();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const isOverdue = !task.completed && isAfter(new Date(), new Date(task.dueDate));

  if (isEditing) {
    return (
      <div className="task-card editing">
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          className="modern-input"
          placeholder="Task title"
        />
        <textarea
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          className="modern-textarea"
          placeholder="Description"
          rows="3"
        />
        <div className="form-row">
          <select
            value={editData.priority}
            onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
            className="modern-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            value={editData.dueDate.split('T')[0]}
            onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
            className="modern-input"
          />
        </div>
        <div className="edit-actions">
          <button onClick={handleEdit} className="submit-btn">Save</button>
          <button onClick={() => setIsEditing(false)} className="action-btn">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div className="task-checkbox">
          <div
            className={`checkbox ${task.completed ? 'checked' : ''}`}
            onClick={toggleComplete}
          />
        </div>

        <div className="task-content">
          <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
            {task.title}
            <span className={`priority-badge priority-${task.priority}`}>
              {task.priority}
            </span>
          </h3>

          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          <div className="task-meta">
            <div className={`due-date ${isOverdue ? 'overdue' : ''}`}>
              <FaCalendarAlt />
              {format(new Date(task.dueDate), 'MMM dd, yyyy')}
              {isOverdue && <FaClock />}
            </div>

            {isOverdue && !task.completed && (
              <span className="overdue-badge">Overdue</span>
            )}
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={() => setIsEditing(true)} className="action-btn edit-btn">
          <FaEdit /> Edit
        </button>
        <button onClick={handleDelete} className="action-btn delete-btn">
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;