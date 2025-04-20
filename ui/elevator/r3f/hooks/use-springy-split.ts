import type { Easing, SpringOptions } from "motion/react";
import { useEffect, useMemo } from "react";
import {
  animate,
  motionValue,
  useSpring,
  ValueAnimationTransition
} from "motion/react";

export interface SpringySplitOptions extends SpringOptions {
  ease?: Easing | Easing[];
}

export function useSpringySplit(open: boolean, config?: SpringySplitOptions) {
  const {
    ease = [0.4, 0, 0.2, 1],
    duration,
    visualDuration,
    bounce,
    stiffness = 150,
    damping = 25,
    mass,
    restSpeed,
    restDelta,
    velocity
  } = config ?? {};

  const x = motionValue(open ? 1 : 0);

  const spring = useSpring(x, {
    stiffness,
    damping,
    mass,
    restSpeed,
    restDelta,
    velocity
  });

  const animateOptsMemo = useMemo(() => {
    return {
      ease,
      duration,
      visualDuration,
      bounce,
      stiffness,
      damping,
      mass,
      restSpeed,
      restDelta,
      velocity
    } satisfies ValueAnimationTransition;
  }, [
    bounce,
    damping,
    duration,
    ease,
    mass,
    restDelta,
    restSpeed,
    stiffness,
    velocity,
    visualDuration
  ]);

  useEffect(() => {
    animate(x, open ? 1 : 0, animateOptsMemo);
  }, [open, animateOptsMemo, x]);

  return spring;
}
