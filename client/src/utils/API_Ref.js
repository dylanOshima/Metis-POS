import axios from 'axios';

const api = (function() {
  const client = axios.create({
    baseURL: 'http://localhost:4444',
    // timeout: 1000,
  });

  client.defaults.headers.post['Content-Type'] = 'application/json'

  function setToken(token) {
    client.defaults.headers.common['x-access-token'] = token;
  }
  
  return {
    client,
    setAPIToken: function(token) { setToken(token); }
  }
})();

export default api;