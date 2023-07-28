/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        siva: {
          800: "#1d1d1d",
          600: "#616161",
        },
        zuta: {
          800: "#eabb13",
          600: "#f1ba15",
        },
        roza: {
          800: "#e5388a",
          600: "#ed409a",
        },
        zelena: {
          800: "#017a74",
          600: "#027b75",
        },
        plava: {
          800: "#215996",
          600: "#215997",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
