import axios from 'axios';

const api = axios.create({
  baseURL: 'https://riders-crew-api.onrender.com'
});

export default api;