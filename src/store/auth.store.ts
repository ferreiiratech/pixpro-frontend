import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  isAuthenticated: boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      logout: () => {
        set({ isAuthenticated: false });
      },
    }),
    { name: "auth-storage" }
  )
);
