export const MOTION = {
  EASE: {
    CINEMATIC: "cubic-bezier(0.2, 0.0, 0.1, 1)",
    HOLD: "cubic-bezier(0.4, 0.0, 0.2, 1)",
  },
  DURATION: {
    MICRO: 120,
    SHORT: 220,
    DEFAULT: 420,
    LONG: 820,
  },
  SCALE: {
    COMPRESSED: 0.95,
    IDLE: 1,
  },
  OPACITY: {
    DIMMED: 0.6,
    FULL: 1,
  }
};

/**
 * Interpolates a value from an input range to an output range
 */
export const interpolate = (
  value: number,
  inputRange: [number, number],
  outputRange: [number, number]
): number => {
  const [inMin, inMax] = inputRange;
  const [outMin, outMax] = outputRange;
  
  // Clamp input
  const clampedValue = Math.min(Math.max(value, inMin), inMax);
  
  const percentage = (clampedValue - inMin) / (inMax - inMin);
  return outMin + percentage * (outMax - outMin);
};
