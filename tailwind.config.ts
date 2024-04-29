import { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const pxToRem = (px: number, base = 16) => `${px / base}rem`;
const range = (start: number, end: number, unit = 1) => {
  const length = Math.ceil((end - start) / unit + 1);
  return Array.from({ length }, (_, i) => start + i * unit);
};

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: { mobile: "768px", tablet: "1024px" },
    colors: {
      transparent: "transparent",
      currentColor: "currentColor",
      white: "#fff",
      black: "#121212",
      surface: "var(--surface)",
      ring: "var(--ring)",
      background: "var(--background)",
      foreground: {
        DEFAULT: "var(--foreground)",
        accent: "var(--foreground-accent)",
        muted: "var(--foreground-muted)",
      },
      primary: {
        DEFAULT: "var(--primary)",
        accent: "var(--primary-accent)",
        surface: "var(--primary-surface)",
        foreground: "var(--primary-foreground)",
      },
      secondary: {
        DEFAULT: "var(--secondary)",
        accent: "var(--secondary-accent)",
        foreground: "var(--secondary-foreground)",
      },
      border: {
        DEFAULT: "var(--border)",
        accent: "var(--border-accent)",
      },
      card: {
        DEFAULT: "var(--card)",
        foreground: "var(--card-foreground)",
      },
      blue: {
        DEFAULT: "var(--blue)",
        surface: "var(--blue)",
        foreground: "var(--blue-foreground)",
      },
      green: {
        DEFAULT: "var(--green)",
        surface: "var(--green)",
        foreground: "var(--green-foreground)",
      },
      yellow: {
        DEFAULT: "var(--yellow)",
        surface: "var(--yellow)",
        foreground: "var(--yellow-foreground)",
      },
      red: {
        DEFAULT: "var(--red)",
        surface: "var(--red)",
        foreground: "var(--red-foreground)",
      },
    },
    extend: {
      spacing: {
        ...range(1, 100).reduce((acc: { [key: string]: string }, px) => {
          acc[`${px}pxr`] = pxToRem(px);
          return acc;
        }, {}),
      },
      listStyleType: {
        circle: "circle",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindAnimate],
};
export default config;
