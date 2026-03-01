"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Step = {
  id: string;
  order: number;
  label: string;
  description: string | null;
  durationSec: number;
};

interface BrewTimerProps {
  recipeName: string;
  steps: Step[];
  onComplete: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function BrewTimer({ recipeName, steps, onComplete }: BrewTimerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(steps[0]?.durationSec ?? 0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isManualStep = step?.durationSec === 0;
  const progress = step && step.durationSec > 0
    ? ((step.durationSec - timeLeft) / step.durationSec) * 100
    : 0;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const advanceStep = useCallback(() => {
    clearTimer();
    if (isLastStep) {
      setIsComplete(true);
      setIsRunning(false);
    } else {
      const next = currentStep + 1;
      setCurrentStep(next);
      setTimeLeft(steps[next].durationSec);
      // Auto-start next step if it has a duration
      if (steps[next].durationSec > 0) {
        setIsRunning(true);
      } else {
        setIsRunning(false);
      }
    }
  }, [clearTimer, currentStep, isLastStep, steps]);

  // Timer tick
  useEffect(() => {
    if (!isRunning || isManualStep) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          advanceStep();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimer();
  }, [isRunning, isManualStep, advanceStep, clearTimer]);

  const handleStartPause = () => {
    if (isManualStep) {
      advanceStep();
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleSkip = () => {
    advanceStep();
  };

  const handleReset = () => {
    clearTimer();
    setCurrentStep(0);
    setTimeLeft(steps[0]?.durationSec ?? 0);
    setIsRunning(false);
    setIsComplete(false);
  };

  if (steps.length === 0) {
    return (
      <Card className="border-border-tan">
        <CardContent className="py-12 text-center">
          <p className="text-text-secondary">No timed steps available for this recipe.</p>
          <p className="mt-2 text-sm text-text-secondary/60">
            Follow the recipe instructions at your own pace.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isComplete) {
    return (
      <Card className="border-border-tan animate-fade-up">
        <CardContent className="py-12 text-center">
          <div className="text-5xl mb-4">☕</div>
          <h2 className="font-heading text-2xl text-text-primary">Brew Complete!</h2>
          <p className="mt-2 text-text-secondary">Your {recipeName} is ready. Enjoy!</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" onClick={handleReset}>
              Brew Again
            </Button>
            <Button onClick={onComplete}>
              Done
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border-tan animate-fade-up">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading text-xl text-text-primary">
            {recipeName}
          </CardTitle>
          <span className="font-mono-accent text-sm text-text-secondary">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        {/* Step progress bar */}
        <div className="flex gap-1 mt-3">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i < currentStep
                  ? "bg-accent-cool"
                  : i === currentStep
                    ? "bg-accent-warm"
                    : "bg-border-tan"
              }`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current step info */}
        <div className="text-center">
          <h3 className="font-heading text-2xl text-text-primary">{step.label}</h3>
          {step.description && (
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              {step.description}
            </p>
          )}
        </div>

        {/* Timer display */}
        {!isManualStep ? (
          <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
            {/* Circular progress ring */}
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-border-tan"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - progress / 100)}`}
                className="text-accent-warm transition-all duration-1000"
              />
            </svg>
            <span className="font-mono-accent text-4xl text-text-primary">
              {formatTime(timeLeft)}
            </span>
          </div>
        ) : (
          <div className="mx-auto flex h-40 w-40 items-center justify-center">
            <span className="text-5xl">👆</span>
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <Button variant="outline" size="sm" onClick={handleReset}>
            Restart
          </Button>
          <Button onClick={handleStartPause} size="lg">
            {isManualStep
              ? "Next Step"
              : isRunning
                ? "Pause"
                : timeLeft === step.durationSec
                  ? "Start"
                  : "Resume"}
          </Button>
          {!isManualStep && (
            <Button variant="outline" size="sm" onClick={handleSkip}>
              Skip
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
