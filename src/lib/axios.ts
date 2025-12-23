import axios from "axios";
import { useAuthStore } from "@/store/auth.store";
import Router from "next/router";
import { useUserProfileStore } from "@/store/user-profile.store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(`${BASE_URL}/auth/refresh`, {}, { withCredentials: true });

        return axiosInstance(originalRequest);
      } catch ( error ) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          useAuthStore.getState().logout();
          useUserProfileStore.getState().clearUser();

          Router.push("/login");
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);
