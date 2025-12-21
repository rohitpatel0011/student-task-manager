import TaskCard from './TaskCard';

const TaskList = ({ tasks, filter, onTaskUpdated }) => {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found. Add your first task! </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {filteredTasks.map(task => (
        <TaskCard
          key={task._id}
          task={task}
          onTaskUpdated={onTaskUpdated}
        />
      ))}
    </div>
  );
};

export default TaskList;