const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  TASKS: `${API_BASE_URL}/api/tasks`,

};

export default API_BASE_URL;