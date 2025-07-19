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
        GENERATE_JOURNEY: `${API_BASE_URL}/bot/generate-journey`,
        JOURNEY: `${API_BASE_URL}/bot/journey`,
        COMPLETE_TASK: (id) => `${API_BASE_URL}/bot/task/${id}/complete`,
        SKIP_TASK: (id) => `${API_BASE_URL}/bot/task/${id}/skip`,
        LEADERBOARD: `${API_BASE_URL}/bot/leaderboard`,
    }
}; 