"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Education() {
  const { education } = PORTFOLIO_DATA;

  return (
    <section
      id="education"
      className="relative z-20 w-full bg-[#050508] py-32 px-6 md:px-12 lg:px-20 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-md mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-mono tracking-widest text-amber-300 uppercase">
              Academic Foundations
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            Education & Milestones<span className="text-amber-400">.</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg leading-relaxed">
            Formal coursework in Computer Science and Engineering at BML Munjal University, accompanied by practical hackathon problem solving and hands-on systems research.
          </p>
        </div>

        {/* 2-Column Grid: Degree & Relevant Coursework + Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Degree & Coursework Card (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-2xl border border-white/[0.08] bg-[#0b0c10]/60 p-8 sm:p-10 backdrop-blur-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-400/10 border border-amber-400/20 text-xs font-mono text-amber-300">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Undergraduate Degree</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{education.timeline}</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {education.degree}
              </h3>
              <div className="flex items-center gap-2 text-sm font-mono text-neutral-300 mb-6">
                <span className="font-semibold text-amber-400">{education.institution}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-neutral-400">
                  <MapPin className="w-3 h-3" />
                  {education.location}
                </span>
              </div>

              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">
                Pursuing a comprehensive curriculum spanning core software engineering, data structures, algorithms, mathematical foundations, and applied machine learning.
              </p>
            </div>

            {/* Coursework List */}
            <div className="pt-6 border-t border-white/[0.06]">
              <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase block mb-4">
                Key Relevant Coursework
              </span>
              <div className="flex flex-wrap gap-2">
                {education.relevantCoursework.map((course) => (
                  <span
                    key={course}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-neutral-300"
                  >
                    <BookOpen className="w-3 h-3 text-amber-400/80" />
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Key Milestones & Hackathons (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 rounded-2xl border border-white/[0.08] bg-[#0b0c10]/60 p-8 sm:p-10 backdrop-blur-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
                  Engineering Milestones
                </span>
              </div>

              <div className="space-y-6">
                {education.milestones.map((milestone, idx) => (
                  <div
                    key={milestone.title}
                    className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{milestone.organization}</span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] text-xs font-mono text-neutral-400">
              <span>Open to engineering internships & research roles.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
