export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// API endpoints
export const ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        SIGNUP: `${API_BASE_URL}/auth/signup`,
        PROFILE: `${API_BASE_URL}/users/profile`,
    },
    BOT: {
        INTERACTIONS: `${API_BASE_URL}/bot/interactions`,
    }
}; 