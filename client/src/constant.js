const isDevelopment = process.env.NODE_ENV === 'development';
export const URL = isDevelopment ? 'http://localhost:3000/api/v1' : '/api/v1';
export const API_URL = isDevelopment ? 'http://localhost:3000' : '';