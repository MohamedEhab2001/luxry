import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0b0c10",
        surface: "#11131a",
        gold: {
          400: "#d4af37",
          500: "#c3a131",
          600: "#a68b27"
        },
        accent: "#2d3748"
      },
      boxShadow: {
        glow: "0 20px 45px rgba(212, 175, 55, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
