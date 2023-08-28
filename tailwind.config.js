/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        DarkBlue: "#10141E",
        SemiDarkBlue: "#161D2F",
        Red: "#FC4747",
        linear:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.75) 100%)",
        HoverLinear:'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))'
      },
      screens: {
        xl: "1440px",
      },
    },
  },
  plugins: [],
};
