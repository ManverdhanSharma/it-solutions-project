const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://phenoxis-backend.onrender.com'  // Your backend URL
    : 'http://localhost:5000', // for local development
};

export default API_CONFIG;
