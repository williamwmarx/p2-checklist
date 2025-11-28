# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

P2 Checklist is a mobile-first PWA for Hollis Prism 2 rebreather pre-dive safety checks. It presents a sequential, step-by-step checklist with timers for pressure tests, acceptable value ranges, and substep tracking.

## Commands

```bash
bun dev      # Start development server
bun build    # Production build
bun start    # Start production server
bun lint     # Run ESLint
```

## Architecture

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4

**Key files:**
- `lib/checklist-data.ts` — All checklist items, types (`ChecklistItem`, `SubStep`, `Range`), and section definitions
- `app/page.tsx` — Main client component managing checklist state (current index, completed steps/substeps)
- `components/` — Presentational components (StepCard, Timer, ProgressBar, RangeDisplay)

**Data flow:** Checklist data is static (exported from `lib/checklist-data.ts`). All state lives in `app/page.tsx` using `useState`. No persistence — state resets on refresh.

**Important patterns:**
- Uses `@/*` path alias for imports
- All interactive components marked `"use client"`
- Timer component vibrates on completion (mobile)
- CSS handles safe-area insets for notched devices

## Type System

```typescript
type ChecklistItem = {
  id: string;
  number: number;  // 0 for non-numbered items
  title: string;
  section: "pre-dive-setup" | "not-diving" | "pre-dive-checks";
  substeps?: SubStep[];
  timerDuration?: number;  // seconds
  ranges?: Range[];
  notes?: string;
};
```

## Notes

- Package manager: `bun` (not pnpm)
- No tests configured yet
- Designed as a single-page app with no routing
