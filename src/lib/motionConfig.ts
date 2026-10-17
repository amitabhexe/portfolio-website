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
  // 1.2s is snappier, 1.6s is more cinematic. Tuned to 1.4s.
  durations: {
    sectionTransition: 1.4, // 1.2s is snappier, 1.6s is more cinematic
    cooldownAfterTransition: 0.25, // ~250ms cooldown to block trackpad inertia while feeling responsive
    textReveal: 0.8,
    cardStagger: 0.1,
    hover: 0.3,
  },

  // GSAP easing equations:
  // "power2.inOut" provides a smooth symmetric bell-curve velocity profile (no bounce, elastic, back, or expo)
  easings: {
    sectionTween: "power2.inOut",
    textEnter: "power3.out",
    textExit: "power2.in",
  },

  // Proportional text transition thresholds relative to full sequence progress (0.0 to 1.0)
  // - Old section text fades out in the first ~30% of each transition
  // - New section text enters in the last ~40% of each transition
  textTiming: {
    // Section 0 (Hero): frame 0 (progress 0.0). Exits in first ~30% of 0->1 tween (0.30 * 0.494 ≈ 0.15)
    section0: {
      fadeStart: 0.0,
      fadeEnd: 0.15,
      exitEnd: 0.18,
    },
    // Section 1 (About): frame 40 (progress ~0.494)
    // Enters in last ~40% of 0->1 tween (~0.30 to 0.494)
    // Exits in first ~30% of 1->2 tween (0.494 + 0.30 * 0.506 ≈ 0.65)
    section1: {
      enterStart: 0.30,
      enterEnd: 0.494,
      exitStart: 0.494,
      exitEnd: 0.65,
    },
    // Section 2 (Approach): frame 81 (progress 1.0)
    // Enters in last ~40% of 1->2 tween (1.0 - 0.40 * 0.506 ≈ 0.80 to 1.0)
    section2: {
      enterStart: 0.80,
      enterEnd: 1.0,
    },
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
