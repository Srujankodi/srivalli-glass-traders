/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        brand: {
          navy: "#0A192F",
          navyDark: "#06101E",
          navyLight: "#12233C",
          teal: "#0D9488",
          tealLight: "#14B8A6",
          tealGlow: "#2DD4BF",
          cyan: "#0284C7",
          cyanGlow: "#38BDF8",
          emerald: "#059669",
          emeraldLight: "#10B981",
          silver: "#F1F5F9",
          slate: "#334155",
          muted: "#64748B",
          gold: "#D97706",
          ice: "#E0F2FE",
        },
        border: "hsl(var(--border, 214 32% 91%))",
        input: "hsl(var(--input, 214 32% 91%))",
        ring: "hsl(var(--ring, 173 80% 36%))",
        background: "hsl(var(--background, 0 0% 100%))",
        foreground: "hsl(var(--foreground, 222 47% 11%))",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(10, 25, 47, 0.12)",
        glassHover: "0 16px 48px 0 rgba(13, 148, 136, 0.25)",
        card: "0 4px 20px -2px rgba(15, 23, 42, 0.08)",
        elevated: "0 20px 45px -10px rgba(15, 23, 42, 0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

