"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { ArrowDown, Code2, Sparkles, Layers, Cpu, Compass } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { MOTION_CONFIG } from "@/lib/motionConfig";

interface OverlayProps {
  activeSection: number;
  scrollYProgress: MotionValue<number>;
  onAdvance?: () => void;
}

export default function Overlay({ activeSection, scrollYProgress, onAdvance }: OverlayProps) {
  const { textTiming } = MOTION_CONFIG;

  // Section 0: Frame 0 (Progress ~0.0). Old text fades out in first ~30% of 0->1 transition
  const opacity0 = useTransform(
    scrollYProgress,
    [textTiming.section0.fadeStart, textTiming.section0.fadeEnd],
    [1, 0]
  );
  const y0 = useTransform(
    scrollYProgress,
    [textTiming.section0.fadeStart, textTiming.section0.exitEnd],
    [0, -50]
  );
  const scale0 = useTransform(
    scrollYProgress,
    [textTiming.section0.fadeStart, textTiming.section0.exitEnd],
    [1, 0.94]
  );
  const pointerEvents0 = useTransform(
    scrollYProgress,
    (v) => (v < textTiming.section0.exitEnd ? "auto" : "none")
  );

  // Section 1: Frame 40 (Progress ~0.49). New text enters in last ~40% of 0->1; exits in first ~30% of 1->2
  const opacity1 = useTransform(
    scrollYProgress,
    [
      textTiming.section1.enterStart,
      textTiming.section1.enterEnd,
      textTiming.section1.exitStart,
      textTiming.section1.exitEnd,
    ],
    [0, 1, 1, 0]
  );
  const y1 = useTransform(
    scrollYProgress,
    [
      textTiming.section1.enterStart,
      textTiming.section1.enterEnd,
      textTiming.section1.exitStart,
      textTiming.section1.exitEnd,
    ],
    [50, 0, 0, -50]
  );
  const pointerEvents1 = useTransform(
    scrollYProgress,
    (v) => (v >= textTiming.section1.enterStart && v < textTiming.section1.exitEnd ? "auto" : "none")
  );

  // Section 2: Frame 81 (Progress ~1.0). New text enters in last ~40% of 1->2
  const opacity2 = useTransform(
    scrollYProgress,
    [textTiming.section2.enterStart, textTiming.section2.enterEnd],
    [0, 1]
  );
  const y2 = useTransform(
    scrollYProgress,
    [textTiming.section2.enterStart, textTiming.section2.enterEnd],
    [50, 0]
  );
  const pointerEvents2 = useTransform(
    scrollYProgress,
    (v) => (v >= textTiming.section2.enterStart ? "auto" : "none")
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-10 w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 select-none">
      {/* ==================== SECTION 0: HERO (CENTER) ==================== */}
      <motion.div
        style={{
          opacity: opacity0,
          y: y0,
          scale: scale0,
          pointerEvents: pointerEvents0,
        }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        {/* Status Pill */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#0d0e15]/90">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono font-medium tracking-wider text-neutral-300 uppercase">
              {PORTFOLIO_DATA.hero.badge}
            </span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white max-w-5xl leading-[0.95] uppercase">
          {PORTFOLIO_DATA.hero.title}
          <span className="text-amber-500">.</span>
        </h1>

        {/* Tagline */}
        <p className="mt-5 sm:mt-6 text-lg sm:text-2xl md:text-3xl font-light text-neutral-300 tracking-tight max-w-3xl">
          {PORTFOLIO_DATA.personal.tagline}
        </p>

        <p className="mt-2 text-xs sm:text-sm font-mono text-amber-400/90 tracking-wide">
          {PORTFOLIO_DATA.hero.subtitle}
        </p>

        {/* Scroll Indicator Prompt */}
        <div
          className="mt-12 flex flex-col items-center gap-3 cursor-pointer pointer-events-auto"
          onClick={onAdvance}
        >
          <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
            {PORTFOLIO_DATA.hero.scrollPrompt}
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-amber-400"
            />
          </div>
        </div>
      </motion.div>

      {/* ==================== SECTION 1: ABOUT (LEFT-ALIGNED) ==================== */}
      <motion.div
        style={{
          opacity: opacity1,
          y: y1,
          pointerEvents: pointerEvents1,
        }}
        className="absolute inset-y-0 left-6 sm:left-12 md:left-20 lg:left-28 flex flex-col justify-center max-w-xl text-left"
      >
        {/* Tag line */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-amber-400" />
          <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
            {PORTFOLIO_DATA.overlaySections.about.tag}
          </span>
        </div>

        {/* Heading with gradient highlight */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
          {PORTFOLIO_DATA.overlaySections.about.headline.split("practical")[0]}
          <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-white bg-clip-text text-transparent">
            practical solutions.
          </span>
        </h2>

        {/* Description */}
        <p className="mt-6 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
          {PORTFOLIO_DATA.overlaySections.about.body}
        </p>

        {/* Feature tags */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {PORTFOLIO_DATA.overlaySections.about.badges.map((badge, idx) => (
            <div
              key={badge}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-white/10 bg-[#0d0e15]/90 text-xs font-mono text-neutral-200"
            >
              {idx === 0 && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
              {idx === 1 && <Cpu className="w-3.5 h-3.5 text-cyan-400" />}
              {idx === 2 && <Layers className="w-3.5 h-3.5 text-amber-300" />}
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ==================== SECTION 2: APPROACH (RIGHT-ALIGNED) ==================== */}
      <motion.div
        style={{
          opacity: opacity2,
          y: y2,
          pointerEvents: pointerEvents2,
        }}
        className="absolute inset-y-0 right-6 sm:right-12 md:right-20 lg:right-28 flex flex-col justify-center max-w-xl text-right ml-auto"
      >
        {/* Tag line */}
        <div className="flex items-center justify-end gap-3 mb-4">
          <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
            {PORTFOLIO_DATA.overlaySections.approach.tag}
          </span>
          <div className="w-8 h-[1px] bg-amber-400" />
        </div>

        {/* Heading with gradient highlight */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
          Understanding systems <br />
          <span className="bg-gradient-to-l from-amber-400 via-amber-200 to-white bg-clip-text text-transparent">
            from data to deployment.
          </span>
        </h2>

        {/* Description */}
        <p className="mt-6 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
          {PORTFOLIO_DATA.overlaySections.approach.body}
        </p>

        {/* Badges */}
        <div className="mt-8 flex flex-wrap justify-end gap-2.5">
          {PORTFOLIO_DATA.overlaySections.approach.badges.map((badge, idx) => (
            <div
              key={badge}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-white/10 bg-[#0d0e15]/90 text-xs font-mono text-neutral-200"
            >
              {idx === 0 && <Code2 className="w-3.5 h-3.5 text-cyan-400" />}
              {idx === 1 && <Compass className="w-3.5 h-3.5 text-amber-400" />}
              {idx === 2 && <Sparkles className="w-3.5 h-3.5 text-purple-400" />}
              <span>{badge}</span>
            </div>
          ))}
        </div>

        {/* Handoff prompt to scroll down to projects */}
        <div className="mt-12 flex items-center justify-end gap-2 text-xs font-mono text-neutral-400 tracking-wider">
          <span>SCROLL DOWN FOR SELECTED WORKS</span>
          <ArrowDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
        </div>
      </motion.div>
    </div>
  );
}
