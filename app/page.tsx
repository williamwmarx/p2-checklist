"use client";

import { useState, useCallback } from "react";
import { CHECKLIST_ITEMS } from "@/lib/checklist-data";
import { StepCard } from "@/components/StepCard";
import { ProgressBar } from "@/components/ProgressBar";

export default function Home(): React.ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [completedSubsteps, setCompletedSubsteps] = useState<
    Record<number, Set<string>>
  >({});

  const currentItem = CHECKLIST_ITEMS[currentIndex];
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === CHECKLIST_ITEMS.length - 1;
  const isCurrentCompleted = completedSteps.has(currentIndex);

  const goNext = useCallback((): void => {
    if (!isLastStep) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [isLastStep]);

  const goPrev = useCallback((): void => {
    if (!isFirstStep) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [isFirstStep]);

  const markComplete = useCallback((): void => {
    setCompletedSteps((prev) => new Set([...prev, currentIndex]));
    goNext();
  }, [currentIndex, goNext]);

  const toggleSubstep = useCallback(
    (substepId: string): void => {
      setCompletedSubsteps((prev) => {
        const currentStepSubsteps = new Set(prev[currentIndex] || []);
        if (currentStepSubsteps.has(substepId)) {
          currentStepSubsteps.delete(substepId);
        } else {
          currentStepSubsteps.add(substepId);
        }
        return { ...prev, [currentIndex]: currentStepSubsteps };
      });
    },
    [currentIndex]
  );

  const resetChecklist = useCallback((): void => {
    setCurrentIndex(0);
    setCompletedSteps(new Set());
    setCompletedSubsteps({});
  }, []);

  const allDone = completedSteps.size === CHECKLIST_ITEMS.length;

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-neutral-900">
      {/* Header with progress */}
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 px-4 py-3 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80">
        <ProgressBar
          current={currentIndex}
          total={CHECKLIST_ITEMS.length}
          completedCount={completedSteps.size}
        />
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-6">
        {allDone ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 text-6xl">✓</div>
            <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Checklist Complete
            </h1>
            <p className="mb-8 text-neutral-600 dark:text-neutral-400">
              All pre-dive checks completed. Dive safe!
            </p>
            <button
              onClick={resetChecklist}
              className="rounded-lg bg-neutral-200 px-6 py-3 font-medium text-neutral-700 transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
            >
              Start New Checklist
            </button>
          </div>
        ) : (
          <StepCard
            item={currentItem}
            completedSubsteps={completedSubsteps[currentIndex] || new Set()}
            onSubstepToggle={toggleSubstep}
          />
        )}
      </main>

      {/* Navigation footer */}
      {!allDone && (
        <footer className="sticky bottom-0 border-t border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex gap-3">
            {/* Previous button */}
            <button
              onClick={goPrev}
              disabled={isFirstStep}
              className={`
                flex-1 rounded-lg px-4 py-4 text-base font-medium transition-colors
                ${
                  isFirstStep
                    ? "bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600"
                    : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
                }
              `}
            >
              ← Back
            </button>

            {/* Complete/Next button */}
            {isCurrentCompleted ? (
              <button
                onClick={goNext}
                disabled={isLastStep}
                className="flex-[2] rounded-lg bg-neutral-200 px-4 py-4 text-base font-medium text-neutral-700 transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={markComplete}
                className="flex-[2] rounded-lg bg-red-500 px-4 py-4 text-base font-medium text-white transition-colors hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
              >
                {isLastStep ? "Complete Checklist" : "Complete & Next →"}
              </button>
            )}
          </div>

          {/* Reset button (small, bottom) */}
          <button
            onClick={resetChecklist}
            className="mt-3 w-full py-2 text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
          >
            Reset Checklist
          </button>
        </footer>
      )}
    </div>
  );
}
