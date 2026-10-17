"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, ArrowUpRight, Sparkles, Terminal, Info, Clock } from "lucide-react";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolioData";

const CATEGORIES = ["All", "AI & Computer Vision", "Full-Stack & Web", "Systems & Desktop"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeNotice, setActiveNotice] = useState<string | null>(null);

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "AI & Computer Vision") {
      return (
        p.tags.includes("Computer Vision") ||
        p.tags.includes("AI / ML") ||
        p.tags.includes("Ultralytics YOLO")
      );
    }
    if (activeCategory === "Full-Stack & Web") {
      return (
        p.tags.includes("Full-Stack") ||
        p.tags.includes("Node.js") ||
        p.tags.includes("Express")
      );
    }
    if (activeCategory === "Systems & Desktop") {
      return (
        p.tags.includes("Desktop GUI") ||
        p.tags.includes("Systems Architecture") ||
        p.tags.includes("Windows Audio") ||
        p.tags.includes("Automation")
      );
    }
    return true;
  });

  const handleWipClick = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    setActiveNotice(`${title} is currently in active research & development. Repository access will be published upon initial milestone release.`);
    setTimeout(() => setActiveNotice(null), 5000);
  };

  return (
    <section
      id="work"
      className="relative z-20 w-full bg-[#050508] py-32 px-6 md:px-12 lg:px-20 border-t border-white/[0.06]"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/[0.03] blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 right-10 w-[500px] h-[400px] bg-cyan-500/[0.02] blur-[140px] rounded-full" />

      {/* Floating Notice Toast */}
      {activeNotice && (
        <div className="fixed bottom-8 right-8 z-50 max-w-md p-4 rounded-xl border border-amber-500/30 bg-[#0f1017]/95 backdrop-blur-xl shadow-2xl flex items-start gap-3 text-xs font-mono text-amber-200">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">{activeNotice}</div>
          <button
            onClick={() => setActiveNotice(null)}
            className="text-neutral-400 hover:text-white ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-md mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-mono tracking-widest text-amber-300 uppercase">
                Engineering Showcase
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              Featured Projects<span className="text-amber-400">.</span>
            </h2>
            <p className="mt-3 text-neutral-400 max-w-xl text-base sm:text-lg">
              Practical software platforms, computer vision hazard models, and system utilities built across hackathons and engineering experiments.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 border cursor-pointer ${
                  activeCategory === cat
                    ? "bg-amber-400 text-black border-amber-400 font-semibold shadow-glow"
                    : "bg-white/[0.03] text-neutral-400 border-white/[0.08] hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid (2 columns on tablet/desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project: ProjectItem, idx: number) => {
            const isWip = project.githubUrl.toLowerCase().includes("progress");

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl border border-white/[0.08] bg-[#0b0c10]/60 backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-amber-400/40 hover:bg-[#10121a]/80 hover:shadow-glow"
              >
                {/* Subtle top edge gradient highlight */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />

                <div>
                  {/* Top metadata row */}
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-6">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      PROJECT {project.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-neutral-300 font-medium text-[11px]">
                      {project.status}
                    </span>
                  </div>

                  {/* Project Title & Category */}
                  <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
                    {project.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1 group-hover:text-amber-100 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Role / Contribution Note */}
                  {project.roleNotes && (
                    <div className="mt-4 text-xs font-mono text-neutral-400 flex items-start gap-1.5 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                      <Terminal className="w-3.5 h-3.5 text-amber-400/80 shrink-0 mt-0.5" />
                      <span>{project.roleNotes}</span>
                    </div>
                  )}

                  {/* Metrics Highlights */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.metrics.map((metric: string) => (
                      <span
                        key={metric}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono text-neutral-300"
                      >
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom row: Tech tags and Links */}
                <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono text-neutral-400 bg-white/[0.02]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    {isWip ? (
                      <button
                        onClick={(e) => handleWipClick(e, project.title)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/5 text-xs font-mono text-amber-300 hover:bg-amber-400/10 transition-colors cursor-pointer"
                        title="Work in Progress"
                      >
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Work in Progress</span>
                      </button>
                    ) : (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-neutral-200 hover:text-white hover:border-amber-400/40 hover:bg-white/[0.08] transition-all cursor-pointer font-medium"
                        aria-label={`View source code for ${project.title}`}
                      >
                        <Github className="w-4 h-4 text-amber-400" />
                        <span>Source Code</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/40 bg-amber-400/10 text-xs font-mono text-amber-300 hover:bg-amber-400 hover:text-black transition-all duration-300 font-medium cursor-pointer"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
