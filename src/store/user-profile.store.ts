import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserProfileStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: "user-storage" }
  )
);