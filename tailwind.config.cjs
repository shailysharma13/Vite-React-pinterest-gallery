/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brandPink: '#ff4081',
        brandBlue: '#1e3a8a',
      },
    },
  },
  plugins: [],
};