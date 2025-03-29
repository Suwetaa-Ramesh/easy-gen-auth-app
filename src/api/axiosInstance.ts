import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; 

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt'); 
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Session expired or unauthorized access");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
