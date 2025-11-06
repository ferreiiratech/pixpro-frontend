"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/hooks/use-onboarding";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface TourStep {
  target: string;
  title: string;
  description: string;
  placement?: "top" | "bottom" | "left" | "right";
}

interface ProductTourProps {
  steps: TourStep[];
  onComplete?: () => void;
  onSkip?: () => void;
}

export function ProductTour({ steps, onComplete, onSkip }: ProductTourProps) {
  const {
    isActive,
    currentStep,
    nextStep,
    prevStep,
    skipTour,
    completeTour,
    isFirstStep,
    isLastStep,
  } = useOnboarding(steps.length);

  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const currentStepData = steps[currentStep];

  useEffect(() => {
    if (!isActive || !currentStepData) {
      setTargetElement(null);
      setPopoverOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      const element = document.querySelector(
        currentStepData.target
      ) as HTMLElement;

      if (element) {
        setTargetElement(element);
        setPopoverOpen(true);

        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        element.style.position = "relative";
        element.style.zIndex = "1000";
      } else {
        console.warn(`Elemento não encontrado: ${currentStepData.target}`);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (targetElement) {
        targetElement.style.position = "";
        targetElement.style.zIndex = "";
      }
    };
  }, [isActive, currentStep, currentStepData, targetElement]);

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      nextStep();
    }
  };

  const handleSkip = () => {
    skipTour();
    onSkip?.();
  };

  const handleComplete = () => {
    completeTour();
    onComplete?.();
  };

  if (!isActive || !currentStepData || !targetElement) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[999]" aria-hidden="true" />

      <div
        className="fixed pointer-events-none z-[1001]"
        style={{
          top: targetElement.offsetTop - 8,
          left: targetElement.offsetLeft - 8,
          width: targetElement.offsetWidth + 16,
          height: targetElement.offsetHeight + 16,
          boxShadow:
            "0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 9999px rgba(0, 0, 0, 0.5)",
          borderRadius: "8px",
          transition: "all 0.3s ease",
        }}
      />

      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <div
            className="absolute z-[1002]"
            style={{
              top: targetElement.offsetTop,
              left: targetElement.offsetLeft,
              width: targetElement.offsetWidth,
              height: targetElement.offsetHeight,
              pointerEvents: "none",
            }}
          />
        </PopoverTrigger>
        <PopoverContent
          side={currentStepData.placement || "bottom"}
          align="start"
          className="w-80 z-[1003] shadow-lg"
          role="dialog"
          aria-labelledby="tour-title"
          aria-describedby="tour-description"
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3
                  id="tour-title"
                  className="font-semibold text-lg leading-tight"
                >
                  {currentStepData.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Etapa {currentStep + 1} de {steps.length}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 -mt-1 -mr-2"
                onClick={handleSkip}
                aria-label="Pular introdução"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <p
              id="tour-description"
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {currentStepData.description}
            </p>

            <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300 ease-out"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
                role="progressbar"
                aria-valuenow={currentStep + 1}
                aria-valuemin={1}
                aria-valuemax={steps.length}
                aria-label={`Progresso do tour: ${currentStep + 1} de ${
                  steps.length
                }`}
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSkip}
                className="text-xs"
              >
                Pular introdução
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevStep}
                  disabled={isFirstStep}
                  aria-label="Etapa anterior"
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleNext}
                  aria-label={isLastStep ? "Finalizar tour" : "Próxima etapa"}
                  className="min-w-[80px]"
                >
                  {isLastStep ? (
                    "Finalizar"
                  ) : (
                    <>
                      Próximo
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
