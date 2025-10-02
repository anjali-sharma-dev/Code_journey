
import api from "../utils/api"; // ✅ relative 

const authService = {
  login: async (email, password) => {
    const response = await api.post("/api/auth/login", { email, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/api/auth/profile");
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put("/api/auth/profile", userData);
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await api.put("/api/auth/change-password", passwordData);
    return response.data;
  },
};

export default authService;
