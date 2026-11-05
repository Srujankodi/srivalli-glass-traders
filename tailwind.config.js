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
          navyDark: "#050D1A",
          navyLight: "#172A45",
          teal: "#0D9488",
          tealLight: "#14B8A6",
          tealGlow: "#2DD4BF",
          silver: "#E2E8F0",
          slate: "#334155",
          muted: "#64748B",
          gold: "#D97706",
          emerald: "#059669",
        },
        border: "hsl(var(--border, 214 32% 91%))",
        input: "hsl(var(--input, 214 32% 91%))",
        ring: "hsl(var(--ring, 173 80% 36%))",
        background: "hsl(var(--background, 0 0% 100%))",
        foreground: "hsl(var(--foreground, 222 47% 11%))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(10, 25, 47, 0.15)",
        glassHover: "0 12px 40px 0 rgba(13, 148, 136, 0.22)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
