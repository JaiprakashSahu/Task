import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

export const fetchNotes = (tag) => {
  const params = tag ? { tag } : {};
  return api.get('/notes', { params });
};

export const createNote = (data) => {
  return api.post('/notes', data);
};

export default api;
