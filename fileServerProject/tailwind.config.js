/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Poppins, monospace",
    },
    extend: {
      colors: {
        green1: "#53B96A",
        green2: "rgba(0,255,102,0.2)",
        green3: "#DCF6E5",
        green4: "rgba(146,142,38,0.75)",
        lightGrey: "#D8D8D8",
        buttonGradient1: "#FF512F",
        buttonGradient2: "#DD2476",
      },
    },
  },
  plugins: [],
};
