"use client";

import { useState, useEffect, useCallback } from "react";
import { useOnboardingStore } from "@/store/onboarding.store";

export function useOnboarding(totalSteps: number) {
  const [state, setState] = useState<OnboardingState>({
    isActive: false,
    currentStep: 0,
    isCompleted: false,
  });

  const hasCompleted = useOnboardingStore((s) => s.hasCompletedOnboarding);

  useEffect(() => {
    if (!hasCompleted) {
      setState({
        isActive: true,
        currentStep: 0,
        isCompleted: false,
      });
    } else {
      setState({
        isActive: false,
        currentStep: 0,
        isCompleted: true,
      });
    }
  }, [hasCompleted]);

  const nextStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep < totalSteps - 1) {
        return {
          ...prev,
          currentStep: prev.currentStep + 1,
        };
      }
      return prev;
    });
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep > 0) {
        return {
          ...prev,
          currentStep: prev.currentStep - 1,
        };
      }
      return prev;
    });
  }, []);

  const skipTour = useCallback(() => {
    useOnboardingStore.getState().markOnboardingCompleted();
    setState({
      isActive: false,
      currentStep: 0,
      isCompleted: true,
    });
  }, []);

  const completeTour = useCallback(() => {
    useOnboardingStore.getState().markOnboardingCompleted();
    setState({
      isActive: false,
      currentStep: 0,
      isCompleted: true,
    });
  }, []);

  const restartTour = useCallback(() => {
    setState({
      isActive: true,
      currentStep: 0,
      isCompleted: false,
    });
  }, []);

  const resetOnboarding = useCallback(() => {
    useOnboardingStore.getState().clearOnboarding();
    setState({
      isActive: true,
      currentStep: 0,
      isCompleted: false,
    });
  }, []);

  return {
    isActive: state.isActive,
    currentStep: state.currentStep,
    isCompleted: state.isCompleted,
    nextStep,
    prevStep,
    skipTour,
    completeTour,
    restartTour,
    resetOnboarding,
    isFirstStep: state.currentStep === 0,
    isLastStep: state.currentStep === totalSteps - 1,
  };
}
