"use client";

import { useCallback, useEffect, useState } from "react";
import type { Step } from "@/lib/types";

export function useStepEngine<TState>(steps: Step<TState>[]) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [prevSteps, setPrevSteps] = useState(steps);

  if (steps !== prevSteps) {
    setPrevSteps(steps);
    setIndex(0);
    setIsPlaying(true);
  }

  useEffect(() => {
    if (!isPlaying || index >= steps.length - 1) return;
    const timer = setTimeout(() => {
      const next = Math.min(index + 1, steps.length - 1);
      setIndex(next);
      if (next >= steps.length - 1) setIsPlaying(false);
    }, 1100 / speed);
    return () => clearTimeout(timer);
  }, [isPlaying, index, speed, steps]);

  const play = useCallback(() => {
    if (steps.length <= 1) return;
    setIndex((i) => (i >= steps.length - 1 ? 0 : i));
    setIsPlaying(true);
  }, [steps]);

  const pause = useCallback(() => setIsPlaying(false), []);

  const next = useCallback(() => {
    setIsPlaying(false);
    setIndex((i) => Math.min(i + 1, steps.length - 1));
  }, [steps]);

  const prev = useCallback(() => {
    setIsPlaying(false);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const seek = useCallback(
    (i: number) => {
      setIsPlaying(false);
      setIndex(Math.max(0, Math.min(i, steps.length - 1)));
    },
    [steps],
  );

  const reset = useCallback(() => {
    setIsPlaying(false);
    setIndex(0);
  }, []);

  return {
    index: Math.min(index, steps.length - 1),
    current: steps[Math.min(index, steps.length - 1)],
    total: steps.length,
    isPlaying,
    speed,
    setSpeed,
    play,
    pause,
    next,
    prev,
    seek,
    reset,
  };
}
