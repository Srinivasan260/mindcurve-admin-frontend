import axios, { AxiosError, type AxiosInstance } from 'axios';
import { env } from '@/config/env';
import { AUTH_TOKEN_KEY, ROUTES } from '@/constants';

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

interface ApiErrorBody {
  success: false;
  message: string;
  details?: unknown;
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: `${env.apiUrl}${env.apiPrefix}`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    // On expired/invalid token, drop local auth and bounce to login — but only
    // for already-authenticated sessions; a 401 from the login endpoint itself
    // is a bad-credentials error and must stay on the form.
    const isLoginRequest = error.config?.url?.endsWith('/admin/auth/login');
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      window.location.href = ROUTES.login;
    }

    const serverMessage = error.response?.data?.message;
    if (serverMessage) {
      error.message = serverMessage;
    }
    return Promise.reject(error);
  },
);
