import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001", // Adjust to match your backend URL
});

// Add an authorization header if the user is logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
