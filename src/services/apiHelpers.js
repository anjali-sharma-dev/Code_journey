// src/services/apiHelpers.js
import api from '../utils/api'; // ✅ relative import

// Authentication API calls
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post('/users/register', { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

// Topics API calls
export const getTopics = async () => {
  try {
    const response = await api.get('/topics');
    return response.data;
  } catch (error) {
    console.error('Get topics error:', error.response?.data || error.message);
    throw error;
  }
};