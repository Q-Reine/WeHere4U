import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

function AuthForm({ onLoginSuccess }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        email: formData.email,
        password: formData.password
      });
      
      if (response.data && response.data.success) {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userRole', response.data.user.role);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        
        const redirectPath = onLoginSuccess(response.data.user.role);
        navigate(redirectPath);
      } else {
        setError(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/user/register', {
        email: formData.email,
        password: formData.password,
        name: formData.name
      });
      
      if (response.data && response.data.success) {
        setSuccess('Registration successful! You can now log in.');
        setFormData({
          ...formData,
          password: ''
        });
        
        // Auto switch to login view after successful registration
        setTimeout(() => {
          setIsLoginView(true);
          setSuccess('');
        }, 3000);
      } else {
        setError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
    setSuccess('');
  };

  return (
    <div className="auth-container">
      <div className="auth-illustration">
        <div className="logo-container">
          <img src="/logo.png" alt="Company Logo" />
        </div>
        <div className="illustration-text">
          <h1>Welcome to Our Platform</h1>
          <p>Secure, fast, and reliable service for all your needs</p>
        </div>
      </div>
      
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <h2>{isLoginView ? 'Login to Your Account' : 'Create an Account'}</h2>
          
          {error && <div className="message error-message">{error}</div>}
          {success && <div className="message success-message">{success}</div>}
          
          {isLoginView ? (
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-action">
                <button type="submit" className="submit-btn" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-action">
                <button type="submit" className="submit-btn" disabled={isLoading}>
                  {isLoading ? 'Registering...' : 'Create Account'}
                </button>
              </div>
            </form>
          )}
          
          <div className="form-toggle">
            <span>{isLoginView ? "Don't have an account?" : "Already have an account?"}</span>
            <button type="button" className="toggle-btn" onClick={toggleView}>
              {isLoginView ? 'Sign up' : 'Log in'}
            </button>
          </div>
          
          {isLoginView && (
            <div className="form-toggle">
              <span>Forgot your password?</span>
              <button type="button" className="toggle-btn">Reset</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthForm;