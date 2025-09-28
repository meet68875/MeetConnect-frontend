// src/services/apiClient.js
import axios from "axios";
import { toast } from "react-toastify"; // Import toast for notifications

const apiClient = axios.create({
  baseURL: "https://meetconnect-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach token to headers
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle errors, especially 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response, // Pass successful responses through
  (error) => {
    // Check if the error is due to an unauthorized token
    if (error.response && error.response.status === 401) {
      // You can also check for a specific message if needed:
      // if (error.response.data.message === "Not authorized, token failed") {
      
      console.error("Authentication error: Not authorized, token failed");

      // 1. Show a toast notification
      toast.error("Session expired. Please log in again.");

      // 2. Perform logout (clear token and user data)
      localStorage.removeItem("accessToken");
      
      // 3. Redirect the user to the login page
      // This is a common pattern, but requires a way to access navigation from outside a React component.
      // We will handle this in a more React-friendly way below.
      setTimeout(() => {
        window.location.href = "/"; // or your login route
      }, 1000); // Redirect after a short delay to allow toast to show

      return Promise.reject(error);
    }
    
    // For all other errors, just reject the promise
    return Promise.reject(error);
  }
);

export default apiClient;