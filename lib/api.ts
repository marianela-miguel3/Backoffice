import axios from 'axios';

// Configuración base de axios
const api = axios.create({
  baseURL: 'https://yellow-bear-store-api.onrender.com/api',
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api; 