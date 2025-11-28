"use client";

import { useState, useEffect, useCallback } from "react";

// Shared AudioContext - reused across all chimes to avoid memory leaks
// and to maintain resumed state from user gesture
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (!audioContext || audioContext.state === "closed") {
    try {
      const AudioContextClass = window.AudioContext ||
        (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioContext = new AudioContextClass();
      }
    } catch {
      return null;
    }
  }
  return audioContext;
}

// Must be called from a user gesture (e.g., button click) to enable audio on iOS
function initAudioContext(): void {
  const ctx = getAudioContext();
  if (ctx?.state === "suspended") {
    ctx.resume();
  }
}

function playChime(): void {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== "running") return;

  const playTone = (frequency: number, startTime: number, duration: number) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    // Fade in quickly, fade out smoothly
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  };

  const now = ctx.currentTime;
  // Two-tone chime: E5 then G5
  playTone(659.25, now, 0.3);        // E5
  playTone(783.99, now + 0.15, 0.4); // G5
}

interface TimerProps {
  duration: number;
  onComplete?: () => void;
}

export function Timer({ duration, onComplete }: TimerProps): React.ReactElement {
  const [remaining, setRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const reset = useCallback((): void => {
    setRemaining(duration);
    setIsRunning(false);
    setIsComplete(false);
  }, [duration]);

  const start = useCallback((): void => {
    // Initialize audio context on user gesture (required for iOS Safari)
    initAudioContext();
    if (isComplete) {
      reset();
    }
    setIsRunning(true);
  }, [isComplete, reset]);

  const pause = useCallback((): void => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (!isRunning || remaining <= 0) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsComplete(true);
          // Audio chime on completion
          playChime();
          // Vibrate on completion (if supported)
          if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 200]);
          }
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, remaining, onComplete]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const display = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div
      className={`
        rounded-lg p-4 text-center transition-colors duration-300
        ${isComplete ? "bg-red-500/20 dark:bg-red-500/30" : "bg-neutral-100 dark:bg-neutral-800"}
        ${isRunning && remaining <= 5 ? "animate-pulse" : ""}
      `}
    >
      {/* Timer display */}
      <div
        className={`
          font-mono text-5xl font-bold tabular-nums tracking-tight
          ${isComplete ? "text-red-600 dark:text-red-400" : "text-neutral-900 dark:text-neutral-100"}
        `}
      >
        {isComplete ? "✓" : display}
      </div>

      {/* Status text */}
      <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        {isComplete
          ? "Time complete"
          : isRunning
            ? "Running..."
            : remaining === duration
              ? `Hold for ${duration >= 60 ? `${duration / 60} minute${duration >= 120 ? "s" : ""}` : `${duration} seconds`}`
              : "Paused"}
      </div>

      {/* Controls */}
      <div className="mt-4 flex justify-center gap-3">
        {!isComplete && (
          <button
            onClick={isRunning ? pause : start}
            className={`
              rounded-lg px-6 py-3 text-base font-medium transition-colors
              ${
                isRunning
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }
            `}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
        )}

        {(isComplete || (!isRunning && remaining !== duration)) && (
          <button
            onClick={reset}
            className="rounded-lg bg-neutral-200 px-6 py-3 text-base font-medium text-neutral-700 transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
