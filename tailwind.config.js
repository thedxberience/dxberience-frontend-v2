/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "text-primary": "#171010",
        "text-secondary": "#171010",
        primary: "#171010",
        secondary: "#F0E3D9",
        accent: "#978C84",
      },
      fontFamily: {
        noah: ["var(--font-noah)"],
        IvyPresto: ["var(--font-ivy-presto)"],
      },
    },
  },
  plugins: [],
};
