/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "orange-main": "#FA7C54",
        "black-main": "#4d4d4d",
      },
    },
  },
  plugins: [],
};
