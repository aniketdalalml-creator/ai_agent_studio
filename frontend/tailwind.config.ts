// Tailwind configuration for Copilot Studio design tokens.
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        primary: {
          DEFAULT: "#185FA5",
          hover: "#0C447C",
        },
        teal: {
          DEFAULT: "#1D9E75",
        },
        purple: {
          DEFAULT: "#7F77DD",
        },
        sidebar: {
          DEFAULT: "#0F172A",
          active: "#1E293B",
        },
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      boxShadow: {
        focus: "0 0 0 3px #B5D4F4",
      },
    },
  },
  plugins: [],
};

export default config;
