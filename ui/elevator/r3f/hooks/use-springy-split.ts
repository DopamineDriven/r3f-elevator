"use client";

import type { Easing, MotionValue, SpringOptions } from "motion/react";
import { useCallback, useEffect } from "react";
import { animate, motionValue } from "motion/react";

export interface SpringySplitOptions extends SpringOptions {
  ease?: Easing | Easing[];
}

export function useSpringySplit(
  open: boolean,
  config?: SpringySplitOptions
): MotionValue<number> {
  const target = open ? 1 : 0;
  const x = motionValue(target);

  const optionsCb = useCallback(() => {
    const {
      ease = [0.4, 0, 0.2, 1],
      visualDuration = 0.75,
      bounce,
      duration=1600,
      stiffness =300,
      damping =100,
      mass = 1,
      restSpeed = 0,
      restDelta = 0,
      velocity
    } = config ?? {};
    return {
      ease,
      visualDuration,
      bounce,
      stiffness,
      damping,
      mass,duration,
      restSpeed,
      restDelta,
      velocity
    } satisfies SpringySplitOptions;
  }, [config]);

  useEffect(() => {
    const cb = optionsCb();
    const controls = animate(x, target, cb);

    return () => controls.stop();
  }, [target, optionsCb, x]);

  return x;
}
