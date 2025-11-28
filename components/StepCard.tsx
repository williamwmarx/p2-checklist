"use client";

import type { ChecklistItem } from "@/lib/checklist-data";
import { Timer } from "./Timer";
import { RangeDisplay } from "./RangeDisplay";

interface StepCardProps {
  item: ChecklistItem;
  completedSubsteps: Set<string>;
  onSubstepToggle: (substepId: string) => void;
}

export function StepCard({
  item,
  completedSubsteps,
  onSubstepToggle,
}: StepCardProps): React.ReactElement {
  const sectionLabels = {
    "pre-dive-setup": "Pre-Dive Setup",
    "not-diving": "Pause Point",
    "pre-dive-checks": "Pre-Dive Checks",
  };

  return (
    <div className="flex flex-col">
      {/* Section label */}
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        {sectionLabels[item.section]}
      </div>

      {/* Step number and title */}
      <div className="mb-6">
        {item.number > 0 && (
          <span className="mr-3 font-mono text-4xl font-bold text-neutral-300 dark:text-neutral-600">
            {item.number.toString().padStart(2, "0")}
          </span>
        )}
        <h1 className="inline text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {item.title}
        </h1>
      </div>

      {/* Notes */}
      {item.notes && (
        <div className="mb-6 rounded-lg bg-amber-500/10 p-4 text-sm text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
          {item.notes}
        </div>
      )}

      {/* Timer (if timed step) */}
      {item.timerDuration && (
        <div className="mb-6">
          <Timer duration={item.timerDuration} />
        </div>
      )}

      {/* Acceptable ranges */}
      {item.ranges && item.ranges.length > 0 && (
        <div className="mb-6">
          <div className="mb-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Acceptable Range
          </div>
          <RangeDisplay ranges={item.ranges} />
        </div>
      )}

      {/* Substeps */}
      {item.substeps && item.substeps.length > 0 && (
        <div className="space-y-3">
          {item.substeps.map((substep) => {
            const isCompleted = completedSubsteps.has(substep.id);
            return (
              <button
                key={substep.id}
                onClick={() => onSubstepToggle(substep.id)}
                className={`
                  flex w-full items-start gap-3 rounded-lg p-4 text-left transition-colors
                  ${
                    isCompleted
                      ? "bg-red-500/10 dark:bg-red-400/10"
                      : "bg-neutral-100 dark:bg-neutral-800"
                  }
                `}
              >
                {/* Checkbox */}
                <div
                  className={`
                    mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 transition-colors
                    ${
                      isCompleted
                        ? "border-red-500 bg-red-500 text-white dark:border-red-400 dark:bg-red-400"
                        : "border-neutral-300 dark:border-neutral-600"
                    }
                  `}
                >
                  {isCompleted && (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                {/* Substep content */}
                <div className="flex-1">
                  <span
                    className={`
                      mr-2 font-mono text-sm font-bold
                      ${isCompleted ? "text-red-600 dark:text-red-400" : "text-neutral-400"}
                    `}
                  >
                    {substep.label}.
                  </span>
                  <span
                    className={`
                      text-base
                      ${
                        isCompleted
                          ? "text-red-700 dark:text-red-300"
                          : "text-neutral-700 dark:text-neutral-300"
                      }
                    `}
                  >
                    {substep.instruction}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
