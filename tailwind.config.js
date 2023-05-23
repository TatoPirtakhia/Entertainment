/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        DarkBlue: "#10141E",
        SemiDarkBlue: "#161D2F",
        Red: "#FC4747",
      },
    },
  },
  plugins: [],
};
