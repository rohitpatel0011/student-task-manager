const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://student-task-manager-backend-uiu9.onrender.com';

export const API_ENDPOINTS = {
  TASKS: `${API_BASE_URL}/api/tasks`,
};

export default API_BASE_URL;