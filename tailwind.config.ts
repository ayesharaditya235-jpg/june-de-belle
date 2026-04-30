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
        rose: {
          50: "#FDF6F9",
          100: "#FAEDF4",
          200: "#F5D5E6",
          300: "#F0B9D5",
          400: "#E879A8",
          500: "#E05590",
          600: "#C94F82",
          700: "#A33968",
          800: "#7D2950",
          900: "#5A1C39",
        },
        blush: "#F9B4C8",
        cream: "#FDF6F9",
        charcoal: "#1A1A1A",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        oldstandard: ["var(--font-old-standard)", "Georgia", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
