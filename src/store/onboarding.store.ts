import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      setOnboardingCompleted: (value: boolean) =>
        set({ hasCompletedOnboarding: value }),
      markOnboardingCompleted: () => set({ hasCompletedOnboarding: true }),
      clearOnboarding: () => set({ hasCompletedOnboarding: false }),
    }),
    { name: "pixpro-onboarding-completed" }
  )
);
