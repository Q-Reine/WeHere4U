import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';
import login from "../assets/login-pic.webp";

// Assuming you have a notification library imported
// If not, you'll need to import it or replace it with your preferred notification method
import { Notify } from 'notiflix';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [language, setLanguage] = useState('en'); // Default language
  
  const { 
    register: registerSignIn, 
    handleSubmit: handleSubmitSignIn,
    formState: { errors: errorsSignIn }
  } = useForm();

  const { 
    register: registerSignUp, 
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp }
  } = useForm();

  const API_URL = 'http://localhost:5000';
  
  // Sign-in handler with React Hook Form and Axios
  const onSubmitSignIn = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      console.log("Connecting to:", `${API_URL}/user/login`);
      
      const response = await axios.post(`${API_URL}/user/login`, {
        email: data.email,
        password: data.password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      });
      
      console.log("Login response:", response);
      
      const userToken = response.data;
      
      // Store user data and token
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('preferredLanguage', language);
      
      // If the backend returns a token, store it
      if (userToken.token) {
        localStorage.setItem('token', userToken.token);
      }
      
      // If the backend returns user data, store relevant info
      if (userToken.user) {
        localStorage.setItem('userId', userToken.user.id || userToken.user._id);
        localStorage.setItem('userName', userToken.user.name);
        localStorage.setItem('role', userToken.user.role);
      }
      
      Notify.success('Login Successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = error.response?.data?.message || "An error occurred";
      setErrorMessage(errorMsg);
      Notify.failure(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Sign-up handler with React Hook Form and Axios
  const onSubmitSignUp = async (data) => {
    if (!agreeToTerms) {
      setErrorMessage("Please agree to the terms");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      console.log("Sending signup request with data:", JSON.stringify(data, null, 2));

      const response = await axios.post(`${API_URL}/user/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "patient"
      }, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });

      console.log("Register response:", response);

      Notify.success("Registration Successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      console.error("Error response:", error.response?.data);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      Notify.failure(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for social login (placeholder)
  const handleSocialLogin = (provider) => {
    console.log(`Social login with ${provider}`);
  };
  
  // Check if user is already logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-illustration">
        <div className="logo-container">
          <img src={login} alt="Login illustration" />
        </div>
      </div>
      
      {isLogin ? (
        <form onSubmit={handleSubmitSignIn(onSubmitSignIn)} className="login-form">
          <h2>Login</h2>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...registerSignIn('email', { required: 'Email is required' })}
            />
            {errorsSignIn.email && <span className="error">{errorsSignIn.email.message}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...registerSignIn('password', { required: 'Password is required' })}
            />
            {errorsSignIn.password && <span className="error">{errorsSignIn.password.message}</span>}
          </div>
          
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
          
          <div className="form-toggle">
            Don't have an account?
            <button type="button" onClick={() => setIsLogin(false)} className="toggle-btn">
              Sign Up
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmitSignUp(onSubmitSignUp)} className="login-form">
          <h2>Sign Up</h2>
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              {...registerSignUp('name', { required: 'Name is required' })}
            />
            {errorsSignUp.name && <span className="error">{errorsSignUp.name.message}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...registerSignUp('email', { required: 'Email is required' })}
            />
            {errorsSignUp.email && <span className="error">{errorsSignUp.email.message}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...registerSignUp('password', { required: 'Password is required' })}
            />
            {errorsSignUp.password && <span className="error">{errorsSignUp.password.message}</span>}
          </div>
          
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
            />
            <label htmlFor="terms">I agree to the Terms and Conditions</label>
          </div>
          
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Sign Up'}
          </button>
          
          <div className="form-toggle">
            Already have an account?
            <button type="button" onClick={() => setIsLogin(true)} className="toggle-btn">
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;