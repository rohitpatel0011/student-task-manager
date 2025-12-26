import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import { API_ENDPOINTS } from '../config/api';
import '../styles/Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // ✅ DEBUG: Check what URL we're using
      console.log('API_ENDPOINTS:', API_ENDPOINTS);
      console.log('Signup URL:', API_ENDPOINTS.AUTH?.SIGNUP);

      // ✅ Use correct API endpoint
      const SIGNUP_URL = API_ENDPOINTS.AUTH?.SIGNUP ||
        'https://student-task-manager-backend-uiu9.onrender.com/api/auth/signup';

      console.log('Final URL:', SIGNUP_URL);
      console.log('Data:', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      const response = await axios.post(
        SIGNUP_URL,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      );

      console.log('✅ Signup Success:', response.data);

      // Save to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to dashboard
      navigate('/dashboard');

    } catch (err) {
      console.error('❌ Signup Error Details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        url: err.config?.url
      });

      // Better error messages
      if (err.response?.status === 400) {
        setError(err.response?.data?.error || 'Invalid data. Please check your inputs.');
      } else if (err.response?.status === 409) {
        setError('Email already exists. Please login instead.');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Network error. Check your internet connection.');
      } else {
        setError('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2><FaUserPlus /> Sign Up</h2>
          <p>Create a new account to get started.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label><FaUser /> Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label><FaEnvelope /> Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label><FaLock /> Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label><FaLock /> Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? (
              <>
                <span className="auth-spinner"></span>
                Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;