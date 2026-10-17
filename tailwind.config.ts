import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050508",
        surface: {
          DEFAULT: "#0b0c10",
          100: "#12131a",
          200: "#1a1b24",
          300: "#242533",
        },
        brand: {
          DEFAULT: "#f59e0b",
          glow: "#ffaa40",
          accent: "#ec4899",
          cyan: "#06b6d4",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        widest: "0.2em",
      },
      boxShadow: {
        glow: "0 0 50px -10px rgba(245, 158, 11, 0.25)",
        "glow-cyan": "0 0 50px -10px rgba(6, 182, 212, 0.25)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
