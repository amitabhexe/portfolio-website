import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: `${PORTFOLIO_DATA.personal.name} — ${PORTFOLIO_DATA.personal.role}`,
  description: `${PORTFOLIO_DATA.personal.name}'s developer portfolio. ${PORTFOLIO_DATA.personal.bioShort}`,
  keywords: [
    "Amitabh Sharma",
    "Software Developer",
    "Computer Science Student",
    "BML Munjal University",
    "Machine Learning",
    "Computer Vision",
    "Full-Stack Development",
    "SonicScope",
    "MPLADS Watch",
    "EfficientNet",
  ],
  authors: [{ name: PORTFOLIO_DATA.personal.name }],
  openGraph: {
    title: `${PORTFOLIO_DATA.personal.name} — Developer Portfolio`,
    description: PORTFOLIO_DATA.personal.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050508",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark guided-mode">
      <head>
        <link
          rel="preload"
          as="image"
          href="/sequence/frame_00_delay-0.05s.webp"
          type="image/webp"
          // @ts-expect-error fetchpriority is standard in modern HTML
          fetchpriority="high"
        />
      </head>
      <body className="bg-[#050508] text-neutral-100 antialiased selection:bg-amber-400 selection:text-black guided-mode">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
