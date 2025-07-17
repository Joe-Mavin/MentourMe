export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

// API endpoints
export const ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/api/auth/login`,
        SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    },
    BOT: {
        INTERACTIONS: `${API_BASE_URL}/api/bot/interactions`,
    }
}; 