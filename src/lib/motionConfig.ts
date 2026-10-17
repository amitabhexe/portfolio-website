/**
 * Shared Motion and Animation Configuration
 * Single source of truth for easing curves, durations, and section frame targets.
 */

export const MOTION_CONFIG = {
  // Section frame targets across the 82-frame sequence (0 to 81)
  sections: [
    { id: 0, key: "hero", title: "Intro", targetFrame: 0 },
    { id: 1, key: "about", title: "About", targetFrame: 40 },
    { id: 2, key: "approach", title: "Approach", targetFrame: 81 },
  ],

  // Transition durations (in seconds)
  // Easily tweak sectionTransition between 2.2s and 2.8s for your desired cinematic pacing
  durations: {
    sectionTransition: 2.4, // Recommended range: 2.2s – 2.8s
    cooldownAfterTransition: 0.15, // Brief debounce to swallow residual trackpad inertia
    textReveal: 0.8,
    cardStagger: 0.1,
    hover: 0.3,
  },

  // GSAP easing equations:
  // "sine.inOut" has a symmetric bell-curve velocity profile:
  // Starts slowly, accelerates smoothly through the middle, decelerates and lands softly.
  // Alternative options: "power2.inOut" or custom cubic-bezier(0.45, 0, 0.55, 1).
  easings: {
    sectionTween: "sine.inOut",
    textEnter: "power3.out",
    textExit: "power2.in",
  },

  // Symmetric cubic-bezier curve for CSS / Framer Motion
  bezier: [0.45, 0, 0.55, 1],

  // Wheel and swipe sensitivity thresholds
  thresholds: {
    wheelDelta: 20,
    touchSwipe: 40,
  },
};

/**
 * Check if the user has requested reduced motion at system level
 */
export function isReducedMotionPreferred(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
