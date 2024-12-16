export const APP_NAME = 'StealthCipher';
export const APP_DESCRIPTION = 'Advanced steganography platform for secure data hiding';

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  SETTINGS: '/settings',
  TEXT: '/text',
  IMAGE: '/image',
  VIDEO: '/video',
  AUDIO: '/audio',
  NETWORK: '/network',
  REVEAL: '/reveal',
  ABOUT: '/about'
} as const;

export const API_CONFIG = {
  OPENAI_TIMEOUT: 30000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000
} as const;

export const FIREBASE_ERRORS = {
  'auth/invalid-email': 'Invalid email address',
  'auth/user-disabled': 'This account has been disabled',
  'auth/user-not-found': 'No account found with this email',
  'auth/wrong-password': 'Incorrect password',
  'auth/too-many-requests': 'Too many failed attempts. Please try again later',
  'auth/email-already-in-use': 'Email already in use',
  'auth/weak-password': 'Password should be at least 6 characters',
  'auth/requires-recent-login': 'Please log in again to perform this action'
} as const;