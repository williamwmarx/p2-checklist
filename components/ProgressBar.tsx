interface ProgressBarProps {
  current: number;
  total: number;
  completedCount: number;
}

export function ProgressBar({
  current,
  total,
  completedCount,
}: ProgressBarProps): React.ReactElement {
  const progress = (completedCount / total) * 100;

  return (
    <div className="space-y-2">
      {/* Step indicator */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-neutral-600 dark:text-neutral-400">
          Step {current + 1} of {total}
        </span>
        <span className="text-neutral-500 dark:text-neutral-500">
          {completedCount} completed
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
        <div
          className="h-full rounded-full bg-red-500 transition-all duration-300 dark:bg-red-400"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
