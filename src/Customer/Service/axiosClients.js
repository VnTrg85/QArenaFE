import axios from 'axios';
import { getAccessToken, getUserEmail, clearStorage } from '/QArenaFE/src/Utils/storageUtils';

const base_url_api = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({
  baseURL: base_url_api,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Gửi access_token và Email
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    const email = getUserEmail();
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    if (email) config.headers['Email'] = email;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Bắt lỗi 401
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      clearStorage();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
