// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import Header from './components/Header';
import StatsDashboard from './components/StatsDashboard';

const API_URL = 'http://localhost:8080/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background-container">
      <div className="sphere-grid-background"></div>

      <div className="content">
        <Header />
        <div className="main-layout">
          <div className="left-panel">
            <div className="form-container">
              <AddTaskForm onTaskAdded={fetchTasks} />
            </div>

            <div className="stats-container">
              <StatsDashboard tasks={tasks} />
            </div>
          </div>

          <div className="right-panel">
            <div className="tasks-header">
              <h2> Your Tasks</h2>
              <FilterBar filter={filter} setFilter={setFilter} />
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading tasks...</p>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                filter={filter}
                onTaskUpdated={fetchTasks}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;