import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import StatsDashboard from '../components/StatsDashboard';
import Header from "../components/Header";
import { SiGoogletasks } from "react-icons/si";
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.TASKS);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="background-container">
      <div className="sphere-grid-background"></div>

      <div className="content">
        <Header user={user} handleLogout={handleLogout}/>
        <main className="dashboard-main">
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
                <h2><SiGoogletasks /> Your Tasks ({tasks.length})</h2>
                <FilterBar filter={filter} setFilter={setFilter} />
              </div>

              {loading ? (
                <div className="loading-container">
                  <div className="spinner"></div>
                  <p>Loading your tasks...</p>
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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;