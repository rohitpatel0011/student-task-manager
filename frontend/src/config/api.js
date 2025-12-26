const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
export const API_ENDPOINTS = {
  BASE: API_BASE_URL,
  TASKS: `${API_BASE_URL}/api/tasks`,
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    SIGNUP: `${API_BASE_URL}/api/auth/signup`
  }
};

export default API_BASE_URL;