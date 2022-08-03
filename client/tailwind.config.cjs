/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "c-sharp-50": "#91c890",
        "c-sharp-100": "#7bbd79",
        "c-sharp-200": "#65b263",
        "c-sharp-300": "#4fa74d",
        "c-sharp-400": "#399c36",
        "c-sharp": "#239120",
        "c-sharp-600": "#20831d",
        "c-sharp-700": "#1c741a",
        "c-sharp-800": "#196616",
        "c-sharp-900": "#155713",

        "dark-900": "#1a1b1b",
        "dark-800": "#252627",
        "dark-700": "#2a2b2c",
        "dark-500": "#292a2b",
        "dark-400": "#363738",

        "disabled-bg": "#4b5154",
        "disabled-color": "#9e9689",

        "visual-studio-bg": "#1E1E1e",
      },
      animation: {
        "spin-slow": "spin 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};
