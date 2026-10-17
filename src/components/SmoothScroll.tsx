"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Configure GSAP ticker lag smoothing (0 prevents lag jump spikes)
    gsap.ticker.lagSmoothing(500, 33);

    // Initialize Lenis for butter-smooth inertial scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis strictly with GSAP ticker clock (single rAF loop)
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);

    // Provide globally so any component can interact if needed
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // In GUIDED state on initial load, stop Lenis immediately so it never moves scroll
    if (document.documentElement.classList.contains("guided-mode")) {
      lenis.stop();
    }

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
