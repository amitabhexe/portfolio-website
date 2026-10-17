"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, ArrowUp, Github, Linkedin, Mail, Globe, Code, Info } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [timeStr, setTimeStr] = useState<string>("");
  const [notice, setNotice] = useState<string | null>(null);

  const { contact, personal } = PORTFOLIO_DATA;

  const handleCopy = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    if (contact.email.startsWith("[ADD")) {
      setNotice(`Placeholder copied: ${contact.email}. Replace this with your actual email in src/data/portfolioData.ts.`);
      setTimeout(() => setNotice(null), 4500);
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLinkClick = (e: React.MouseEvent, url: string, name: string) => {
    if (url.startsWith("[ADD")) {
      e.preventDefault();
      setNotice(`${name} link placeholder: ${url}. Add your actual profile URL in src/data/portfolioData.ts.`);
      setTimeout(() => setNotice(null), 4500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      id="contact"
      className="relative z-20 w-full bg-[#050508] pt-32 pb-16 px-6 md:px-12 lg:px-20 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-amber-500/[0.04] blur-[150px] rounded-full" />

      {/* Floating Notice Toast */}
      {notice && (
        <div className="fixed bottom-8 right-8 z-50 max-w-md p-4 rounded-xl border border-amber-500/30 bg-[#0f1017]/95 backdrop-blur-xl shadow-2xl flex items-start gap-3 text-xs font-mono text-amber-200">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">{notice}</div>
          <button
            onClick={() => setNotice(null)}
            className="text-neutral-400 hover:text-white ml-2"
          >
            ✕
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Top Call to Action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div className="max-w-2xl">
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
              // Get in touch
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mt-3 leading-[0.95]">
              Let&apos;s build <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-white bg-clip-text text-transparent">
                together.
              </span>
            </h2>
            <p className="mt-6 text-neutral-400 text-base sm:text-lg max-w-lg leading-relaxed">
              {contact.subtext}
            </p>
          </div>

          {/* Interactive Email Copy Card */}
          <div className="flex flex-col gap-4">
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono text-neutral-400 block mb-1">
                  DIRECT INQUIRIES
                </span>
                <span className="font-mono text-base sm:text-lg text-white font-medium">
                  {contact.email}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-white transition-all cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-neutral-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={contact.email.startsWith("[ADD") ? "#" : `mailto:${contact.email}`}
                  onClick={(e) => handleLinkClick(e, contact.email, "Email")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-medium transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Mail</span>
                </a>
              </div>
            </div>

            {/* Local time & location status */}
            <div className="flex items-center justify-between px-2 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{contact.locationDisplay}</span>
              </span>
              <span>{timeStr || "IST"}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/[0.06] mb-12" />

        {/* Bottom Bar */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 text-xs font-mono text-neutral-400">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span>© {new Date().getFullYear()} {personal.name.toUpperCase()}. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="text-neutral-400">NEXT.js 14 • TYPESCRIPT • TAILWIND CSS</span>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-6">
            <a
              href={contact.github.startsWith("[ADD") ? "#" : contact.github}
              onClick={(e) => handleLinkClick(e, contact.github, "GitHub")}
              target={contact.github.startsWith("[ADD") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="hover:text-white transition-colors cursor-pointer"
              aria-label="GitHub Profile"
              title={contact.github.startsWith("[ADD") ? contact.github : "GitHub"}
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={contact.linkedin.startsWith("[ADD") ? "#" : contact.linkedin}
              onClick={(e) => handleLinkClick(e, contact.linkedin, "LinkedIn")}
              target={contact.linkedin.startsWith("[ADD") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="hover:text-white transition-colors cursor-pointer"
              aria-label="LinkedIn Profile"
              title={contact.linkedin.startsWith("[ADD") ? contact.linkedin : "LinkedIn"}
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={contact.leetcode.startsWith("[ADD") ? "#" : contact.leetcode}
              onClick={(e) => handleLinkClick(e, contact.leetcode, "LeetCode")}
              target={contact.leetcode.startsWith("[ADD") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              aria-label="LeetCode Profile"
              title={contact.leetcode.startsWith("[ADD") ? contact.leetcode : "LeetCode"}
            >
              <Code className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full border border-white/10 hover:border-amber-400 text-neutral-400 hover:text-white transition-colors ml-4 cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
