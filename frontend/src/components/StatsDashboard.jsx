import { IoStatsChart } from "react-icons/io5";
const StatsDashboard = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriority = tasks.filter(t => t.priority === 'high').length;

  const completionPercentage = totalTasks > 0
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <div className="stats-dashboard">
      <h3><IoStatsChart /> Task Statistics</h3>

      <div className="stats-grid">
        <div className="stat-card">

          <div className="stat-info">
            <p className="stat-label">Total Tasks</p>
            <p className="stat-value">{totalTasks}</p>
          </div>
        </div>

        <div className="stat-card">

          <div className="stat-info">
            <p className="stat-label">Completed</p>
            <p className="stat-value">{completedTasks}</p>
          </div>
        </div>

        <div className="stat-card">

          <div className="stat-info">
            <p className="stat-label">Pending</p>
            <p className="stat-value">{pendingTasks}</p>
          </div>
        </div>

        <div className="stat-card">

          <div className="stat-info">
            <p className="stat-label">High Priority</p>
            <p className="stat-value">{highPriority}</p>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span>Progress</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;