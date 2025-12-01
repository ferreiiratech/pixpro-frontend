"use client";

import { useState, useEffect, useCallback } from "react";

const ONBOARDING_STORAGE_KEY = "pixpro-onboarding-completed";

export function useOnboarding(totalSteps: number) {
  const [state, setState] = useState<OnboardingState>({
    isActive: false,
    currentStep: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_STORAGE_KEY);

    if (!completed) {
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
  }, []);

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
    localStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
    setState({
      isActive: false,
      currentStep: 0,
      isCompleted: true,
    });
  }, []);

  const completeTour = useCallback(() => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
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
    localStorage.removeItem(ONBOARDING_STORAGE_KEY);
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
