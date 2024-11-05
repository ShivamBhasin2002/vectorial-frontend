import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans"],
      },
      colors: {
        cream: "#F5F0E5",
        green: "#009963",
        borderGray: "#D8D9D4",
        brown: "#A1824A",
        offwhite: "#f9f9f8",
        purps: "#665cc8",
        grey: "#e2e3e1",
        darkGrey: "#EFEFEE",
        blue: "#0B2230",
        yellow: "#F9D133",

        primary: {
          0: "var(--primary-0)",
          20: "var(--primary-20)",
          40: "var(--primary-40)",
          60: "var(--primary-60)",
          80: "var(--primary-80)",
          100: "var(--primary-100)",
        },
        surface: {
          0: "var(--black)",
          20: "var(--surface-20)",
          40: "var(--surface-40)",
          60: "var(--surface-60)",
          80: "var(--surface-80)",
          100: "var(--surface-100)",
        },
        mixed: {
          0: "var(--mixed-0)",
          20: "var(--mixed-20)",
          40: "var(--mixed-40)",
          60: "var(--mixed-60)",
          80: "var(--mixed-80)",
          100: "var(--mixed-100)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
