import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  
  // Get navigate function
  const navigate = useNavigate();
  
  // Set axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);
  
  // Check if token is valid on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        // Get user profile
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/profile`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Authentication failed', error);
        logout();
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [token]);
  
  // Login user
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password
      });
      
      const { token: authToken, ...userData } = response.data;
      
      // Save token to local storage
      localStorage.setItem('token', authToken);
      
      // Update state
      setToken(authToken);
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error('Login failed', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please check your credentials.'
      };
    }
  };
  
  // Register user
  const register = async (userData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, userData);
      
      const { token: authToken, ...newUserData } = response.data;
      
      // Save token to local storage
      localStorage.setItem('token', authToken);
      
      // Update state
      setToken(authToken);
      setUser(newUserData);
      
      return { success: true };
    } catch (error) {
      console.error('Registration failed', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed. Please try again.'
      };
    }
  };
  
  // Logout user
  const logout = useCallback(() => {
    // Remove token from local storage
    localStorage.removeItem('token');
    
    // Reset state
    setToken(null);
    setUser(null);
    
    // Navigate to login page
    navigate('/login');
  }, [navigate]);
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading,
      isAuthenticated: !!user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
