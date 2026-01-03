import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import StatsDashboard from '../components/StatsDashboard';
import BottomNav from '../components/BottomNav'; // ✅ New Component
import Header from "../components/Header";
import '../styles/Dashboard.css';

// React Icons (Black color)
import {
  SiGoogletasks,

} from "react-icons/si";
import {GiNotebook} from "react-icons/gi"
import {
  FaPlus,
  FaChartBar,
  FaFilter,
  FaHome,
  FaUserCircle,
  FaSignOutAlt
} from 'react-icons/fa';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('tasks'); // ✅ Mobile view state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // ✅ Detect mobile

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // ✅ Mobile Views Renderer
  const renderMobileView = () => {
    switch (activeView) {
      case 'home':
        return (
          <div className="mobile-view">
            <div className="mobile-section">
              <h2 className="mobile-title">
                <FaHome className="mobile-icon" /> Dashboard
              </h2>
              <p className="welcome-text">Welcome back, {user?.name}! 👋</p>

              <div className="quick-stats">
                <div className="stat-item">
                  <span className="stat-label">Total Tasks</span>
                  <span className="stat-value">{tasks.length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Completed</span>
                  <span className="stat-value">
                    {tasks.filter(t => t.completed).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'add':
        return (
          <div className="mobile-view">
            <div className="mobile-section">
              <h2 className="mobile-title">
                <FaPlus className="mobile-icon" /> Add New Task
              </h2>
              <AddTaskForm onTaskAdded={fetchTasks} />
            </div>
          </div>
        );

      case 'tasks':
        return (
          <div className="mobile-view">
            <div className="mobile-section">
              <div className="mobile-header">
                <h2 className="mobile-title">
                  <SiGoogletasks className="mobile-icon" /> Your Tasks
                  <span className="task-count">({tasks.length})</span>
                </h2>
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
        );

      case 'stats':
        return (
          <div className="mobile-view">
            <div className="mobile-section">
              <h2 className="mobile-title">
                <FaChartBar className="mobile-icon" /> Statistics
              </h2>
              <StatsDashboard tasks={tasks} />
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="mobile-view">
            <div className="mobile-section profile-section">
              <h2 className="mobile-title">
                <FaUserCircle className="mobile-icon" /> Profile
              </h2>

              <div className="profile-card">
                <div className="profile-header">
                  <div className="avatar">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="profile-info">
                    <h3>{user?.name}</h3>
                    <p>{user?.email}</p>
                  </div>
                </div>

                <div className="profile-stats">
                  <div className="profile-stat">
                    <span className="stat-number">{tasks.length}</span>
                    <span className="stat-label">Total Tasks</span>
                  </div>
                  <div className="profile-stat">
                    <span className="stat-number">
                      {tasks.filter(t => t.completed).length}
                    </span>
                    <span className="stat-label">Completed</span>
                  </div>
                  <div className="profile-stat">
                    <span className="stat-number">
                      {tasks.filter(t => t.priority === 'high').length}
                    </span>
                    <span className="stat-label">High Priority</span>
                  </div>
                </div>

                <button className="logout-btn-mobile" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return renderMobileView();
    }
  };

  // ✅ Desktop View (Original Layout)
  const renderDesktopView = () => (
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
          <h2><SiGoogletasks className="header-icon" /> Your Tasks ({tasks.length})</h2>
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
  );

  return (
    <div className="dashboard-container">
      {/* Background Elements */}
      <div className="background-container">
        <div className="sphere-grid-background"></div>
        <div className="bg-logo"><GiNotebook /></div>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Header - Desktop Only */}
        {!isMobile && <Header user={user} handleLogout={handleLogout} />}

        <main className="dashboard-main">
          {isMobile ? renderMobileView() : renderDesktopView()}
        </main>

        {/* Bottom Navigation - Mobile Only */}
        {isMobile && (
          <BottomNav
            activeView={activeView}
            setActiveView={setActiveView}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;