"use client";

import React from "react";
import { motion } from "framer-motion";
import { MOTION_CONFIG } from "@/lib/motionConfig";

interface SectionNavIndicatorsProps {
  activeSection: number;
  onSelectSection: (index: number) => void;
  visible: boolean;
}

export default function SectionNavIndicators({
  activeSection,
  onSelectSection,
  visible,
}: SectionNavIndicatorsProps) {
  if (!visible) return null;

  return (
    <nav
      aria-label="Story chapter navigation"
      className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-end gap-5 pointer-events-auto select-none"
    >
      {MOTION_CONFIG.sections.map((section, idx) => {
        const isActive = activeSection === idx;
        return (
          <button
            key={section.id}
            onClick={() => onSelectSection(idx)}
            className="group flex items-center gap-3 cursor-pointer py-1 text-right focus:outline-none"
            aria-label={`Jump to ${section.title} section`}
          >
            {/* Hover title label */}
            <span
              className={`text-[11px] font-mono tracking-widest uppercase transition-all duration-300 ${
                isActive
                  ? "text-amber-400 opacity-100 font-semibold"
                  : "text-neutral-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
              }`}
            >
              0{idx} {section.title}
            </span>

            {/* Indicator Dot / Pill */}
            <div className="relative flex items-center justify-center w-2.5 h-6">
              <div
                className={`w-2 h-6 rounded-full origin-center transition-all duration-300 ${
                  isActive
                    ? "bg-amber-400 scale-y-100 opacity-100"
                    : "bg-white/40 scale-y-[0.33] opacity-60 group-hover:opacity-100 group-hover:scale-y-[0.5]"
                }`}
                style={{ willChange: "transform, opacity" }}
              />
            </div>
          </button>
        );
      })}
    </nav>
  );
}
