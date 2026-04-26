import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#111118",
        "surface-2": "#1a1a24",
        "surface-3": "#22222e",
        border: "#2a2a38",
        "border-light": "#3a3a4a",
        primary: "#6366f1",
        "primary-light": "#818cf8",
        "primary-dark": "#4f46e5",
        accent: "#a855f7",
        "accent-blue": "#3b82f6",
        "accent-cyan": "#06b6d4",
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        "text-primary": "#f1f5f9",
        "text-secondary": "#94a3b8",
        "text-muted": "#64748b",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #6366f1, #a855f7)",
        "gradient-danger": "linear-gradient(135deg, #ef4444, #f97316)",
        "gradient-success": "linear-gradient(135deg, #10b981, #06b6d4)",
        "gradient-card": "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.05))",
        "glow-primary": "radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(99,102,241,0.3)",
        "glow-md": "0 0 20px rgba(99,102,241,0.4)",
        "glow-lg": "0 0 40px rgba(99,102,241,0.3)",
        "glow-danger": "0 0 20px rgba(239,68,68,0.4)",
        "glow-success": "0 0 20px rgba(16,185,129,0.4)",
        card: "0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "scroll": "scroll 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 10px rgba(99,102,241,0.3)" },
          "100%": { boxShadow: "0 0 25px rgba(99,102,241,0.6)" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
