import type { Range } from "@/lib/checklist-data";

interface RangeDisplayProps {
  ranges: Range[];
}

export function RangeDisplay({ ranges }: RangeDisplayProps): React.ReactElement {
  return (
    <div className="space-y-3">
      {ranges.map((range) => (
        <div
          key={range.label}
          className="rounded-lg border-2 border-amber-500/50 bg-amber-500/15 p-3 dark:border-amber-400/50 dark:bg-amber-400/15"
        >
          <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {range.label}
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {range.min === range.max ? (
                range.min
              ) : (
                <>
                  {range.min}
                  <span className="mx-1 text-lg text-neutral-400">–</span>
                  {range.max}
                </>
              )}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {range.unit}
            </span>
          </div>
          {range.max === 99 && (
            <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              (minimum: ≥{range.min} {range.unit})
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
