import axios from "axios";
import { API_URL, TOKEN_STORAGE_KEY } from "@/lib/constants";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data.data,
  (error) => {
    const message =
      error.response?.data?.error?.message || "Something went wrong";

    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      window.location.href = "/login";
    }

    return Promise.reject(new Error(message));
  }
);

export const setAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};
