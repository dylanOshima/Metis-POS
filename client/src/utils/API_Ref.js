import axios from 'axios';

const api = {
  client: axios.create({
    baseURL: 'http://localhost:4444',
    // timeout: 1000,
  }),
} 

export default api;