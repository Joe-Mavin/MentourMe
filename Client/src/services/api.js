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
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    console.log('Authorization header set:', !!config.headers.Authorization);
  } else {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    console.log('No token found in localStorage');
  }
  return config;
});

export default API;
