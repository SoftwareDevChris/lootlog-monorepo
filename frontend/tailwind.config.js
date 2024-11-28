/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        constellation: "url('../public/endless-constellation.svg')",
      },
      colors: {
        orangeCustom900: "#b36b00",
        orangeCustom800: "#d97d00",
        orangeCustom700: "#ec8600",
        orangeCustom600: "#ff9d00",
        orangeCustom500: "#ffb400",
        orangeCustom400: "#ffcb00",
      },
      screens: {
        lg2: "1200px",
      },
      height: {
        header: "5rem",
      },
      maxHeight: {
        header: "5rem",
      },
      minHeight: {
        header: "5rem",
      },
    },
  },
  plugins: [],
};
