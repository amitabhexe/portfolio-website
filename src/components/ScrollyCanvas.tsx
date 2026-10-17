"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useMotionValue } from "framer-motion";
import { TOTAL_FRAMES, getFramePath } from "@/data/sequenceData";
import { MOTION_CONFIG, isReducedMotionPreferred } from "@/lib/motionConfig";
import Overlay from "@/components/Overlay";
import SectionNavIndicators from "@/components/SectionNavIndicators";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

export type AppState = "GUIDED" | "FREE";

interface ScrollyCanvasProps {
  children?: React.ReactNode;
}

export default function ScrollyCanvas({ children }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cached Image elements and decode statuses
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isDecodedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));

  // State Machine: Explicit "GUIDED" (locked hero) vs "FREE" (page document scroll)
  const [appState, setAppState] = useState<AppState>("GUIDED");
  const appStateRef = useRef<AppState>("GUIDED");

  // GSAP Observer reference
  const observerRef = useRef<Observer | null>(null);

  // Single source of truth for continuous fractional frame progression
  const frameState = useRef<{ frame: number }>({ frame: 0 });
  const activeTweenRef = useRef<gsap.core.Tween | null>(null);

  // Direction of the active tween: 1 for forward, -1 for backward, 0 for idle
  const tweenDirectionRef = useRef<number>(0);

  // Target and current section indices (0: Hero, 1: About, 2: Approach)
  const targetSectionRef = useRef<number>(0);
  const [activeSection, setActiveSection] = useState<number>(0);
  const lastRenderedIndexRef = useRef<number>(-1);

  // Cooldown flag to prevent rapid inertia re-triggers after landing (350ms)
  const isCooldownRef = useRef<boolean>(false);

  // Free-mode touch tracking
  const freeTouchStartYRef = useRef<number>(0);

  // Viewport & DPR cache to eliminate layout thrashing during draw calls
  const dimensionsRef = useRef<{ width: number; height: number; dpr: number }>({
    width: 0,
    height: 0,
    dpr: 1,
  });

  // Loading state (frame 0 decode hides initial preloader)
  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // Continuous Framer Motion value (0 to 1) passed to Overlay for lockstep typography transitions
  const scrollYProgress = useMotionValue(0);

  // Temporary Verification HUD for Step 3
  const [debugScrollY, setDebugScrollY] = useState<number>(0);
  const [showDebugHUD, setShowDebugHUD] = useState<boolean>(true);

  // Low-level imperative render: draws frame with subpixel cover fit and retina support
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Use requested frame, or fallback to nearest loaded frame to eliminate any flash
    let img = imagesRef.current[frameIndex];
    if (!img || !isDecodedRef.current[frameIndex]) {
      let nearestIndex = -1;
      let minDiff = Infinity;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (isDecodedRef.current[i]) {
          const diff = Math.abs(i - frameIndex);
          if (diff < minDiff) {
            minDiff = diff;
            nearestIndex = i;
          }
        }
      }
      if (nearestIndex !== -1) {
        img = imagesRef.current[nearestIndex];
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { width, height } = dimensionsRef.current;
    if (width === 0 || height === 0) return;

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const scale = Math.max(width / imgWidth, height / imgHeight);

    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;
    const offsetX = (width - drawWidth) * 0.5;
    const offsetY = (height - drawHeight) * 0.5;

    ctx.save();
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, width, height);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, []);

  // Sync canvas buffer size to viewport * DPR (invoked only on resize)
  const updateDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    dimensionsRef.current = { width, height, dpr };

    const targetWidth = Math.round(width * dpr);
    const targetHeight = Math.round(height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Immediately redraw after resize to prevent blank canvas
    const currentFrame = Math.round(frameState.current.frame);
    renderFrame(currentFrame);
    lastRenderedIndexRef.current = currentFrame;
  }, [renderFrame]);

  // Section Transition Engine: Bell-curve easing with seamless mid-flight interruptibility
  const goToSection = useCallback(
    (targetSection: number, isInterrupt = false) => {
      if (targetSection < 0 || targetSection > 2) return;

      const currentFractionalFrame = frameState.current.frame;
      const targetFrame = MOTION_CONFIG.sections[targetSection].targetFrame;

      // Determine movement direction
      const direction = targetFrame > currentFractionalFrame ? 1 : -1;
      tweenDirectionRef.current = direction;
      targetSectionRef.current = targetSection;
      setActiveSection(targetSection);

      // Kill any active tween before starting the new one
      if (activeTweenRef.current) {
        activeTweenRef.current.kill();
      }

      // Calculate proportional duration if interrupted mid-flight
      const frameDelta = Math.abs(targetFrame - currentFractionalFrame);
      const standardSectionSpan = 40; // ~40 frames between sections
      const baseDuration = MOTION_CONFIG.durations.sectionTransition; // 2.4s

      let calculatedDuration = isInterrupt
        ? Math.max(0.7, (frameDelta / standardSectionSpan) * baseDuration)
        : baseDuration;

      const reducedMotion = isReducedMotionPreferred();
      if (reducedMotion) {
        calculatedDuration = 0.3;
      }

      // Single continuous GSAP tween driving fractional frame
      activeTweenRef.current = gsap.to(frameState.current, {
        frame: targetFrame,
        duration: calculatedDuration,
        ease: MOTION_CONFIG.easings.sectionTween, // "sine.inOut" (pure symmetric bell curve)
        onUpdate: () => {
          const currentFrame = frameState.current.frame;
          // Synchronize continuous 0-to-1 progress for typography transforms
          scrollYProgress.set(currentFrame / (TOTAL_FRAMES - 1));

          const rounded = Math.round(currentFrame);
          if (rounded !== lastRenderedIndexRef.current) {
            renderFrame(rounded);
            lastRenderedIndexRef.current = rounded;
          }
        },
        onComplete: () => {
          activeTweenRef.current = null;
          tweenDirectionRef.current = 0;
          isCooldownRef.current = true;

          // Cooldown to absorb trailing trackpad inertia
          setTimeout(() => {
            isCooldownRef.current = false;
          }, MOTION_CONFIG.durations.cooldownAfterTransition * 1000);
        },
      });
    },
    [renderFrame, scrollYProgress]
  );

  // ==========================================
  // STATE MACHINE TRANSITION FUNCTIONS
  // EXACTLY ONE FUNCTION PER DIRECTION
  // ==========================================

  // Switch from GUIDED -> FREE (Page scrolls normally)
  const switchToFree = useCallback(() => {
    if (appStateRef.current === "FREE") return;
    appStateRef.current = "FREE";
    setAppState("FREE");

    // 1. Remove overflow lock from html and body
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("guided-mode");
      document.body.classList.remove("guided-mode");
      document.documentElement.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("height");
      document.documentElement.style.removeProperty("overscroll-behavior");
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("height");
      document.body.style.removeProperty("overscroll-behavior");
    }

    // 2. Disable the GUIDED Observer
    if (observerRef.current) {
      observerRef.current.disable();
    }

    // 3. Start Lenis and initiate fluid scroll into Projects
    if (typeof window !== "undefined") {
      const lenis = (
        window as unknown as {
          __lenis?: {
            start: () => void;
            scrollTo: (target: number | string | HTMLElement, opts?: object) => void;
          };
        }
      ).__lenis;

      if (lenis) {
        lenis.start();
        // Nudge scroll slightly so user immediately sees Projects revealing
        lenis.scrollTo(120, { duration: 0.8 });
      } else {
        window.scrollBy({ top: 120, behavior: "smooth" });
      }
    }
  }, []);

  // Switch from FREE -> GUIDED (Page locked to Hero)
  const switchToGuided = useCallback(() => {
    if (appStateRef.current === "GUIDED") return;
    appStateRef.current = "GUIDED";
    setAppState("GUIDED");

    // 1. Strictly align window.scrollY to 0
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      setDebugScrollY(0);
    }

    // 2. Apply overflow lock on html and body
    if (typeof document !== "undefined") {
      document.documentElement.classList.add("guided-mode");
      document.body.classList.add("guided-mode");
      document.documentElement.style.setProperty("overflow", "hidden", "important");
      document.documentElement.style.setProperty("height", "100%", "important");
      document.documentElement.style.setProperty("overscroll-behavior", "none", "important");
      document.body.style.setProperty("overflow", "hidden", "important");
      document.body.style.setProperty("height", "100%", "important");
      document.body.style.setProperty("overscroll-behavior", "none", "important");
    }

    // 3. Stop Lenis completely
    if (typeof window !== "undefined") {
      const lenis = (
        window as unknown as {
          __lenis?: { stop: () => void };
        }
      ).__lenis;

      if (lenis) {
        lenis.stop();
      }
    }

    // 4. Re-enable the GUIDED Observer
    if (observerRef.current) {
      observerRef.current.enable();
    }
  }, []);

  // Dispatch gesture intent in GUIDED mode (1 = Down, -1 = Up)
  const handleGesture = useCallback(
    (direction: 1 | -1) => {
      if (appStateRef.current !== "GUIDED") return;

      const isTweening =
        activeTweenRef.current !== null && activeTweenRef.current.isActive();
      const currentDir = tweenDirectionRef.current;
      const currentSec = targetSectionRef.current;

      // 1. Mid-flight interrupt handling
      if (isTweening) {
        // If moving opposite to active tween, smoothly reverse without jumping
        if ((direction === -1 && currentDir > 0) || (direction === 1 && currentDir < 0)) {
          if (direction === -1) {
            const prevSec = Math.max(0, currentSec - 1);
            goToSection(prevSec, true);
          } else {
            const nextSec = Math.min(2, currentSec + 1);
            goToSection(nextSec, true);
          }
        }
        return;
      }

      // 2. Cooldown check (swallow residual trackpad inertia after landing)
      if (isCooldownRef.current) {
        return;
      }

      // 3. State progression
      if (direction === 1) {
        // Gesture Down (Advance)
        if (currentSec === 0) {
          goToSection(1);
        } else if (currentSec === 1) {
          goToSection(2);
        } else if (currentSec === 2) {
          // At section 02 (Approach), user scrolls down again -> Hand off to FREE mode!
          switchToFree();
        }
      } else if (direction === -1) {
        // Gesture Up (Reverse)
        if (currentSec === 2) {
          goToSection(1);
        } else if (currentSec === 1) {
          goToSection(0);
        }
      }
    },
    [goToSection, switchToFree]
  );

  // Progressive Preload Pipeline (Priority batch + decode)
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loadedCount = 0;

    const PRIORITY_BATCH = Math.min(12, TOTAL_FRAMES);

    const loadSingleImage = async (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(index);

        img.onload = async () => {
          if (isCancelled) return resolve();

          if ("decode" in img) {
            try {
              await img.decode();
            } catch {
              // fallback to standard
            }
          }

          if (isCancelled) return resolve();

          isDecodedRef.current[index] = true;
          images[index] = img;
          loadedCount++;

          // As soon as frame 0 is ready, draw immediately to canvas and fade out loader
          if (index === 0) {
            updateDimensions();
            renderFrame(0);
            lastRenderedIndexRef.current = 0;
            setIsReady(true);
          }

          if (loadedCount >= 6 || loadedCount === TOTAL_FRAMES) {
            setIsReady(true);
          }

          const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
          setLoadPercent(percent);

          resolve();
        };

        img.onerror = () => {
          loadedCount++;
          if (loadedCount >= 6) {
            setIsReady(true);
          }
          resolve();
        };

        images[index] = img;
      });
    };

    const loadAll = async () => {
      // 1. High priority first batch
      const priorityBatch: Promise<void>[] = [];
      for (let i = 0; i < PRIORITY_BATCH; i++) {
        priorityBatch.push(loadSingleImage(i));
      }
      await Promise.all(priorityBatch);
      setIsReady(true);

      // 2. Progressive background stream in concurrent chunks of 6
      const CHUNK_SIZE = 6;
      for (let i = PRIORITY_BATCH; i < TOTAL_FRAMES; i += CHUNK_SIZE) {
        if (isCancelled) break;
        const chunk: Promise<void>[] = [];
        for (let j = i; j < Math.min(i + CHUNK_SIZE, TOTAL_FRAMES); j++) {
          chunk.push(loadSingleImage(j));
        }
        await Promise.all(chunk);
      }
      setIsReady(true);
    };

    // Safety timeout: ensure loader never remains stuck on screen
    const safetyTimer = setTimeout(() => {
      setIsReady(true);
    }, 700);

    imagesRef.current = images;
    loadAll();

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
    };
  }, [renderFrame, updateDimensions]);

  // State Machine Setup, Observer Initialization & Event Handlers
  useEffect(() => {
    // 1. Force initial scroll to top and lock
    if (typeof history !== "undefined" && history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    setDebugScrollY(0);

    // Ensure GUIDED state styles are applied
    document.documentElement.classList.add("guided-mode");
    document.body.classList.add("guided-mode");
    document.documentElement.style.setProperty("overflow", "hidden", "important");
    document.documentElement.style.setProperty("height", "100%", "important");
    document.documentElement.style.setProperty("overscroll-behavior", "none", "important");
    document.body.style.setProperty("overflow", "hidden", "important");
    document.body.style.setProperty("height", "100%", "important");
    document.body.style.setProperty("overscroll-behavior", "none", "important");

    // Initialize dimensions
    updateDimensions();

    // 2. Create GSAP Observer for GUIDED mode (wheel, touch, pointer)
    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      preventDefault: true,
      tolerance: 12,
      onDown: () => {
        handleGesture(1);
      },
      onUp: () => {
        handleGesture(-1);
      },
    });
    observerRef.current = observer;

    // 3. Document-level Keyboard Capture (passive: false, preventDefault)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (appStateRef.current === "GUIDED") {
        if (
          ["ArrowDown", "PageDown", "Space"].includes(e.code) ||
          (e.code === "ArrowRight" && !e.altKey && !e.ctrlKey)
        ) {
          e.preventDefault();
          handleGesture(1);
        } else if (
          ["ArrowUp", "PageUp"].includes(e.code) ||
          (e.code === "ArrowLeft" && !e.altKey && !e.ctrlKey)
        ) {
          e.preventDefault();
          handleGesture(-1);
        } else if (e.code === "Home") {
          e.preventDefault();
          goToSection(0);
        } else if (e.code === "End") {
          e.preventDefault();
          goToSection(2);
        }
      } else if (appStateRef.current === "FREE") {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        if (scrollY <= 2 && ["ArrowUp", "PageUp"].includes(e.code)) {
          e.preventDefault();
          switchToGuided();
          goToSection(1);
        }
      }
    };

    // 4. FREE-mode input listeners: Re-enter GUIDED when scrolling UP at scrollY <= 0
    const handleFreeWheel = (e: WheelEvent) => {
      if (appStateRef.current !== "FREE") return;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      setDebugScrollY(scrollY);

      if (scrollY <= 2 && e.deltaY < -12) {
        e.preventDefault();
        switchToGuided();
        goToSection(1);
      }
    };

    const handleFreeTouchStart = (e: TouchEvent) => {
      freeTouchStartYRef.current = e.touches[0].clientY;
    };

    const handleFreeTouchMove = (e: TouchEvent) => {
      if (appStateRef.current !== "FREE") return;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      setDebugScrollY(scrollY);

      if (scrollY <= 2) {
        const deltaY = e.touches[0].clientY - freeTouchStartYRef.current;
        if (deltaY > 25) {
          e.preventDefault();
          switchToGuided();
          goToSection(1);
        }
      }
    };

    // 5. Scroll Guard: guarantees window.scrollY stays 0 during the entire GUIDED phase
    const handleScrollGuard = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      setDebugScrollY(scrollY);

      if (appStateRef.current === "GUIDED" && scrollY !== 0) {
        window.scrollTo(0, 0);
        setDebugScrollY(0);
      }
    };

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("wheel", handleFreeWheel, { passive: false });
    window.addEventListener("touchstart", handleFreeTouchStart, { passive: true });
    window.addEventListener("touchmove", handleFreeTouchMove, { passive: false });
    window.addEventListener("scroll", handleScrollGuard, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Expose control bridge globally for Navbar
    (
      window as unknown as {
        __portfolioState?: {
          switchToFree: () => void;
          switchToGuided: () => void;
          goToSection: (sec: number) => void;
          getState: () => AppState;
        };
      }
    ).__portfolioState = {
      switchToFree,
      switchToGuided,
      goToSection,
      getState: () => appStateRef.current,
    };

    return () => {
      observer.kill();
      observerRef.current = null;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleFreeWheel);
      window.removeEventListener("touchstart", handleFreeTouchStart);
      window.removeEventListener("touchmove", handleFreeTouchMove);
      window.removeEventListener("scroll", handleScrollGuard);
      window.removeEventListener("resize", handleResize);
      delete (
        window as unknown as {
          __portfolioState?: unknown;
        }
      ).__portfolioState;
    };
  }, [goToSection, handleGesture, switchToFree, switchToGuided, updateDimensions]);

  return (
    <div
      ref={containerRef}
      id="hero-scroll-container"
      className="relative w-full h-screen bg-[#050508]"
      style={{
        // Instant poster frame 0: guarantees zero black screen on initial load
        backgroundImage: "url('/sequence/frame_00_delay-0.05s.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#050508",
      }}
    >
      {/* 
        Stage Viewport:
        - In GUIDED mode: position: fixed; inset: 0 (completely locked to viewport, zero page scroll)
        - In FREE mode: position: absolute; inset: 0 (lives at top of document and scrolls up naturally)
      */}
      <div
        ref={stageRef}
        className={`${
          appState === "GUIDED" ? "fixed inset-0" : "absolute inset-0"
        } z-20 w-full h-full overflow-hidden flex items-center justify-center`}
      >
        {/* Hardware-accelerated HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="block w-full h-full select-none gpu-layer"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        />

        {/* Ambient Vignette & Seamless Blending Gradients */}
        <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-[#050508]/10 to-[#050508]/75" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050508] via-[#050508]/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050508] via-[#050508]/80 to-transparent" />

        {/* Minimal High-Tech Preloader Screen (Fades immediately on frame 0 decode) */}
        <div
          className={`pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050508]/90 backdrop-blur-md transition-all duration-500 ease-out ${
            isReady ? "opacity-0 pointer-events-none invisible" : "opacity-100"
          }`}
        >
          <div className="flex flex-col items-center gap-6 max-w-xs text-center px-6">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-amber-500/20 border-t-amber-500 animate-spin" />
              <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-mono">
                Initializing Cinema
              </p>
              <div className="w-44 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-150 ease-out"
                  style={{ width: `${Math.max(15, loadPercent)}%` }}
                />
              </div>
              <p className="text-[11px] text-neutral-500 font-mono">
                {loadPercent}% BUFFERED
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Parallax Overlay with Section Text */}
        <Overlay
          activeSection={activeSection}
          scrollYProgress={scrollYProgress}
          onAdvance={() => {
            if (activeSection < 2) {
              goToSection(activeSection + 1);
            } else {
              switchToFree();
            }
          }}
        />

        {/* Clickable 00 / 01 / 02 Section Chapter Navigation */}
        <SectionNavIndicators
          activeSection={activeSection}
          onSelectSection={(idx) => {
            if (appStateRef.current === "FREE") {
              switchToGuided();
            }
            goToSection(idx);
          }}
          visible={appState === "GUIDED"}
        />

        {/* Any custom children */}
        {children}
      </div>

      {/* Temporary Verification HUD for STEP 3 */}
      {showDebugHUD && (
        <div
          id="scroll-debug-hud"
          className="fixed bottom-4 left-4 z-[9999] bg-black/90 border border-amber-500/50 rounded-lg p-3 font-mono text-xs text-amber-300 shadow-2xl pointer-events-auto"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-1 mb-2">
            <span className="font-bold text-amber-400">SCROLL STATE DEBUG</span>
            <button
              onClick={() => setShowDebugHUD(false)}
              className="text-neutral-400 hover:text-white text-[10px] uppercase tracking-wider cursor-pointer"
            >
              [Hide]
            </button>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between gap-3">
              <span className="text-neutral-400">MODE:</span>
              <span
                className={`font-bold ${
                  appState === "GUIDED" ? "text-emerald-400" : "text-blue-400"
                }`}
              >
                {appState}
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-neutral-400">WINDOW SCROLL_Y:</span>
              <span className="font-bold text-white">{debugScrollY}px</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-neutral-400">CHAPTER:</span>
              <span className="font-bold text-white">
                0{activeSection} ({MOTION_CONFIG.sections[activeSection]?.title})
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-neutral-400">FRAME:</span>
              <span className="text-neutral-300">
                {Math.round(frameState.current.frame)} / {TOTAL_FRAMES - 1}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
