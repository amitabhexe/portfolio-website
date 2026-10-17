"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Terminal, Eye, Cpu, Database, Wrench } from "lucide-react";
import { PORTFOLIO_DATA, SkillCategory } from "@/data/portfolioData";

const CATEGORY_ICONS = [
  Code2,
  Database,
  Eye,
  Cpu,
  Wrench,
  Terminal,
];

export default function Capabilities() {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section
      id="skills"
      className="relative z-20 w-full bg-[#050508] py-32 px-6 md:px-12 lg:px-20 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md mb-4">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-mono tracking-widest text-cyan-300 uppercase">
              {skills.sectionTag}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            {skills.sectionTitle.split(".")[0]}<span className="text-amber-400">.</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg leading-relaxed">
            {skills.sectionSubtitle}
          </p>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {skills.categories.map((cat: SkillCategory, i: number) => {
            const Icon = CATEGORY_ICONS[i % CATEGORY_ICONS.length];
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10 backdrop-blur-xl transition-all duration-400 hover:border-amber-400/30 hover:bg-white/[0.04] flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:border-amber-400 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.05]">
                  {cat.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-neutral-300"
                    >
                      <span className="w-1 h-1 rounded-full bg-amber-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Telemetry Strip */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#090a0f]/80 backdrop-blur-xl p-8 sm:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.telemetry.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  {item.label}
                </span>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                  {item.value}
                </span>
                <span className="text-xs font-mono text-amber-400/80 mt-2">
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
