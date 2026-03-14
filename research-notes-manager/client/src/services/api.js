import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://task-2-wbdn.onrender.com',
});

export const fetchNotes = (tag) => {
  const params = tag ? { tag } : {};
  return api.get('/notes', { params });
};

export const createNote = (data) => {
  return api.post('/notes', data);
};

export default api;
