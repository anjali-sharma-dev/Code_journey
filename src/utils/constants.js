
// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/me',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  TOPICS: {
    GET_ALL: '/topic/get',
    CREATE: '/topic/create',
    UPDATE: '/topic/update',
    DELETE: '/topic/delete',
  },
  QUESTIONS: {
    GET_BY_TOPIC_AND_LEVEL: '/question/get',
    CREATE: '/question/create',
    UPDATE: '/question/update',
    DELETE: '/question/delete',
    UPDATE_SOLVED: '/questions/:id/solved',
    UPDATE_STARRED: '/questions/:id/starred',
  },
  USER: {
    PROGRESS: '/user/progress',
  },
};

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

// Question difficulty levels
export const DIFFICULTY_LEVELS = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
};

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROBLEM: '/problem',
  BLOG: '/blog',
  CONTEST: '/contest',
  INTERVIEW: '/interview',
  STORE: '/store',
  ADMIN: {
    DASHBOARD: '/admin',
    USERS: '/admin/users',
    TOPICS: '/admin/topics',
    QUESTIONS: '/admin/questions',
    SETTINGS: '/admin/settings',
  },
};