/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brandGray: 'gray-50',
        Gray: 'gray-900',
      },
    },
  },
  plugins: [],
};