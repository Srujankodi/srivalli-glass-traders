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
        crimson: {
          DEFAULT: "#8B1E2D",
          dark: "#68121E",
          light: "#A6273A",
          bright: "#B91C1C",
          soft: "#FEF2F2",
        },
        brand: {
          crimson: "#8B1E2D",
          crimsonDark: "#68121E",
          crimsonLight: "#A6273A",
          navy: "#0F172A",
          navyDark: "#020617",
          navyLight: "#1E293B",
          slate: "#334155",
          muted: "#64748B",
          silver: "#F8FAFC",
          cardBorder: "#E2E8F0",
        },
        border: "hsl(var(--border, 214 32% 91%))",
        input: "hsl(var(--input, 214 32% 91%))",
        ring: "hsl(var(--ring, 352 64% 33%))",
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
        serif: [
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        card: "0 4px 20px -2px rgba(15, 23, 42, 0.06)",
        hover: "0 14px 30px -4px rgba(139, 30, 45, 0.12)",
      },
    },
  },
  plugins: [],
};
