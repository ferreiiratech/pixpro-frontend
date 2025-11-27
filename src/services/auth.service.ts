import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/store/auth.store";
import { useUserProfileStore } from "@/store/user-profile.store";
import { AxiosError } from "axios";

type LoginCredentials = {
  email: string;
  password: string;
};

type SignupCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

type SignupResponse = {
  name: string;
  email: string;
};

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await axiosInstance.post<LoginResponse>("/auth/login", credentials);

      return { success: response.status === 200, message: null };
    } catch (error) {
      if (error instanceof AxiosError) {
        return { success: false, message: error.response?.data?.message || "Erro ao autenticar" };
      }

      return { success: false, message: "Erro ao autenticar" };
    }
  },

  async register(credentials: SignupCredentials) {
    try {
      const response = await axiosInstance.post<SignupResponse>("/auth/register", credentials);

      return { success: response.status === 201, message: null };
    } catch (error) {
      if (error instanceof AxiosError) {
        return { success: false, message: error.response?.data?.message || "Erro ao registrar" };
      }

      return { success: false, message: "Erro ao registrar" };
    }
  },

  async logout() {
    try {
      await axiosInstance.post("/auth/logout");
      
      useAuthStore.getState().logout();
      useUserProfileStore.getState().clearUser();

      return { success: true, message: null };
    } catch (error) {
      if (error instanceof AxiosError) {
        return { success: false, message: error.response?.data?.message || "Erro ao deslogar" };
      }

      return { success: false, message: "Erro ao deslogar" };
    }
  }
};