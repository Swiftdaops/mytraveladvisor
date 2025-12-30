import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

export const uploadFormData = (formData) =>
  api.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
