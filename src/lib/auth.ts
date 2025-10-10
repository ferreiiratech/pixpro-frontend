import { publicEnv } from "@/env";

export const auth = {
  login: async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string; data?: unknown }> => {
    try {
      const response = await fetch(
        `${publicEnv.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Erro ao autenticar",
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Erro inesperado",
      };
    }
  },

  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string; data?: unknown }> => {
    try {
      const response = await fetch(
        `${publicEnv.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Erro ao criar conta",
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Erro inesperado",
      };
    }
  },

  checkAuth: async (): Promise<boolean> => {
    try {
      const response = await fetch(`${publicEnv.NEXT_PUBLIC_API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      return response.ok;
    } catch {
      return false;
    }
  },

  logout: async (): Promise<boolean> => {
    try {
      const response = await fetch(
        `${publicEnv.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      return response.ok;
    } catch {
      return false;
    }
  },

  authenticatedFetch: async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    return fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  },
};
