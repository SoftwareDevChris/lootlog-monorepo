/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        constellation: "url('../public/endless-constellation.svg')",
      },
      screens: {
        lg2: "1200px",
      },
    },
  },
  plugins: [],
};
