import axios from "axios";
import { API_BASE_URL } from "../config/environment";

const API = axios.create({
  baseURL: API_BASE_URL, // Use environment variable for base URL
});

// Add an authorization header if the user is logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const sendMessage = (senderId, receiverId, content) =>
  API.post('/api/messages', { senderId, receiverId, content });

export const fetchMessagesForUser = (userId) =>
  API.get(`/api/messages/${userId}`);

export const markMessageAsRead = (messageId) =>
  API.patch(`/api/messages/${messageId}/read`);

export default API;
