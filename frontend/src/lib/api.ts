// Axios API client with auth token attach and automatic refresh handling.
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

import { useAuthStore } from "../store/authStore";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface RefreshResponse {
  access_token: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function refreshToken(): Promise<string> {
  const currentToken = useAuthStore.getState().token;
  if (!currentToken) {
    throw new Error("No token available for refresh.");
  }

  const response = await axios.post<RefreshResponse>(
    `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
    {},
    {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    },
  );

  const newToken = response.data.access_token;
  useAuthStore.getState().setToken(newToken);
  window.localStorage.setItem("copilot_studio_token", newToken);
  return newToken;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.localStorage.removeItem("copilot_studio_token");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
