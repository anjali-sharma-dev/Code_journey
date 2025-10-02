import axios from "axios";
import.meta.env.VITE_API_URL


const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → auto logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


// Topic related API calls
export const getTopics = async () => {
  try {
    const response = await api.get('/topic/get');
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
};

// Question related API calls
export const getQuestionsByTopicAndLevel = async (topicId, level) => {
  try {
    const response = await api.get(`/question/get/${topicId}?level=${level}`);
    return response.data || [];
  } catch (error) {
    console.error(`Error fetching ${level} questions for topic ${topicId}:`, error);
    throw error;
  }
};

export const updateQuestionSolvedStatus = async (questionId, solved) => {
  try {
    const response = await api.patch(`/questions/${questionId}/solved`, { solved });
    return response.data;
  } catch (error) {
    console.error('Error updating solved status:', error);
    throw error;
  }
};

export const updateQuestionStarredStatus = async (questionId, starred) => {
  try {
    const response = await api.patch(`/questions/${questionId}/starred`, { starred });
    return response.data;
  } catch (error) {
    console.error('Error updating starred status:', error);
    throw error;
  }
};

export default api;