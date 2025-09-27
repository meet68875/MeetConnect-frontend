// src/services/interviewService.js
import apiClient from "./apiClient";

export const interviewService = {
  scheduleInterview: async (interviewDetails) => {
    const { data } = await apiClient.post("/interviews/schedule", interviewDetails);
    return data;
  },

 getUserInterviews: async (status = "Upcoming", page = 1, limit = 10) => {
    const { data } = await apiClient.get(`/interviews/my-interviews?status=${status}&page=${page}&limit=${limit}`);
    return data;
  },

  updateInterviewStatus: async (interviewId, statusData) => {
    const { data } = await apiClient.put(`/interviews/${interviewId}/update`, statusData);
    return data;
  },
   updateInterviewDetails: async (interviewId, updatedDetails) => {
    const { data } = await apiClient.put(`/interviews/${interviewId}`, updatedDetails);
    return data;
  },
};