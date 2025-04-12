import type { Config as TailwindConfig } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "selector",
  future: { hoverOnlyWhenSupported: true },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      transitionDuration: {
        theme: "var(--theme-transition-duration)",
        loading: "var(--loading-animation-duration)"
      }
    }
  }
} satisfies TailwindConfig;
