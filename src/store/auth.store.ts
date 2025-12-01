import { create } from "zustand";
import { persist } from "zustand/middleware";

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
