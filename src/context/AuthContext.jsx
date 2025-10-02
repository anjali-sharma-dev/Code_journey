import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'; // Fixed import statement
import authService from '../services/authService';

// Create the authentication context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // Authenticated user info
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Auth errors

  // Check if user is authenticated on initial load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          try {
            const decoded = jwt_decode(token);

            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
              localStorage.removeItem('token');
              setUser(null);
            } else {
              setUser(decoded);
            }
          } catch (error) {
            localStorage.removeItem('token');
            setUser(null);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);
      localStorage.setItem('token', response.token);

      const decoded = jwt_decode(response.token);
      setUser(decoded);

      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      return { success: false, error: err.response?.data?.error || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const response = await authService.register({ name, email, password });
      localStorage.setItem('token', response.token);

      const decoded = jwt_decode(response.token);
      setUser(decoded);

      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      return { success: false, error: err.response?.data?.error || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Check if user has admin role
  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
