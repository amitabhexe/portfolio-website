import React from "react";
import Navbar from "@/components/Navbar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import Capabilities from "@/components/Capabilities";
import Education from "@/components/Education";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050508] text-white selection:bg-amber-400 selection:text-black">
      {/* Top Reading Progress Line */}
      <ScrollProgressBar />

      {/* Floating Glassmorphic Navigation */}
      <Navbar />

      {/* Main Experience */}
      <main className="relative w-full">
        {/* Guided Cinematic Section-Snapped Hero with Canvas Frame Tweens */}
        <ScrollyCanvas />

        {/* Component 3: The Work Grid */}
        <Projects />

        {/* Technical Skills & Competencies */}
        <Capabilities />

        {/* Education & Academic Milestones */}
        <Education />
      </main>

      {/* Contact & Footer */}
      <ContactFooter />
    </div>
  );
}
