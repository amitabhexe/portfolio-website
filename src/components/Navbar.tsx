"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const portfolioState = (
      window as unknown as {
        __portfolioState?: {
          switchToFree: () => void;
          switchToGuided: () => void;
          goToSection: (sec: number) => void;
        };
      }
    ).__portfolioState;

    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (target: string | number | HTMLElement, options?: object) => void };
      }
    ).__lenis;

    if (id === "top") {
      if (portfolioState) {
        portfolioState.switchToGuided();
        portfolioState.goToSection(0);
      }
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Navigating down into content: unlock to FREE mode
    if (portfolioState) {
      portfolioState.switchToFree();
    }

    // Give DOM a microtask to release overflow lock before scrolling to target
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        if (lenis) {
          lenis.scrollTo(el, { duration: 1.2, offset: -30 });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 20);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center p-4 sm:p-6 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between gap-6 px-5 py-3 rounded-full border transition-all duration-500 max-w-5xl w-full ${
          scrolled
            ? "border-white/10 bg-[#07070a]/85 backdrop-blur-xl shadow-glass"
            : "border-white/[0.06] bg-white/[0.02] backdrop-blur-md"
        }`}
      >
        {/* Monogram Brand */}
        <button
          onClick={() => scrollTo("top")}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500/20 to-amber-300/10 border border-amber-500/30 flex items-center justify-center text-xs font-mono font-bold text-amber-400 group-hover:scale-105 group-hover:border-amber-400 transition-all">
            {PORTFOLIO_DATA.personal.initials}
          </div>
          <span className="font-mono text-xs tracking-wider text-neutral-300 font-semibold group-hover:text-white transition-colors uppercase">
            {PORTFOLIO_DATA.personal.name}
            <span className="text-amber-500">.</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 font-mono text-xs text-neutral-400">
          <button
            onClick={() => scrollTo("top")}
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
          >
            // 00. Intro
          </button>
          <button
            onClick={() => scrollTo("work")}
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
          >
            // 01. Projects
          </button>
          <button
            onClick={() => scrollTo("skills")}
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
          >
            // 02. Skills
          </button>
          <button
            onClick={() => scrollTo("education")}
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
          >
            // 03. Education
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
          >
            // 04. Contact
          </button>
        </div>

        {/* Right CTA / Status */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[11px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{PORTFOLIO_DATA.personal.statusBadge}</span>
          </div>

          <button
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-medium transition-all duration-300 hover:shadow-glow cursor-pointer"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full border border-white/10 text-neutral-300 hover:text-white cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 inset-x-6 z-50 pointer-events-auto rounded-2xl border border-white/10 bg-[#07070a]/95 backdrop-blur-2xl p-6 shadow-2xl flex flex-col gap-4 font-mono text-sm md:hidden"
          >
            <button
              onClick={() => scrollTo("top")}
              className="text-left py-2 text-neutral-300 hover:text-white border-b border-white/5 cursor-pointer"
            >
              // 00. Intro
            </button>
            <button
              onClick={() => scrollTo("work")}
              className="text-left py-2 text-neutral-300 hover:text-white border-b border-white/5 cursor-pointer"
            >
              // 01. Projects
            </button>
            <button
              onClick={() => scrollTo("skills")}
              className="text-left py-2 text-neutral-300 hover:text-white border-b border-white/5 cursor-pointer"
            >
              // 02. Skills & Foundations
            </button>
            <button
              onClick={() => scrollTo("education")}
              className="text-left py-2 text-neutral-300 hover:text-white border-b border-white/5 cursor-pointer"
            >
              // 03. Education & Background
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="text-left py-2 text-neutral-300 hover:text-white cursor-pointer"
            >
              // 04. Contact & Profiles
            </button>
            <div className="pt-2">
              <button
                onClick={() => scrollTo("contact")}
                className="w-full py-2.5 rounded-xl bg-amber-400 text-black font-semibold text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
