import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL });

export const getPortfolioData = () => api.get('/portfolio/all');
export const submitContact = (data) => api.post('/contact', data);

export default api;
