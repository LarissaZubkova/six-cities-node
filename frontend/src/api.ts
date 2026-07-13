import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Token } from './utils/utils';

const BACKEND_URL = 'http://localhost:5000';
const REQUEST_TIMEOUT = 5000;

const PUBLIC_ROUTES = ['/login', '/register'];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const isPublicRoute = PUBLIC_ROUTES.some((route) =>
        config.url?.includes(route)
      );

      if (!isPublicRoute) {
        const token = Token.get();

        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      toast.dismiss();

      if (error.response?.status === 401) {
        Token.drop(); // Удаляем токен

        const isLoginRequest = error.config?.url?.includes('/login');
        if (!isLoginRequest) {
          window.location.href = '/login';
        }
      }

      const errorMessage = error.response?.data?.message || error.message;
      toast.warn(errorMessage);

      return Promise.reject(error);
    }
  );

  return api;
};
