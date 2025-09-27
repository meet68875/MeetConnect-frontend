//authService.js
import apiClient from "./apiClient";

export const authService = {
  login: async (credentials) => {
    const { data } = await apiClient.post("/auth/login", credentials);
    return data;
  },
  
  signup: async (formData) => {
    const { data } = await apiClient.post("/auth/register", formData);
    return data;
  },
  
  getProfile: async () => {
    const { data } = await apiClient.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },

  updateProfile: async (userData) => {
    const { data } = await apiClient.put("/user/profile", userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },
  getUserInterviews: async () => {
    const { data } = await apiClient.get('/interviews/my-interviews', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return data;
  }
};
