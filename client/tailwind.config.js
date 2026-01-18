/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0a0a18',
        'space-blue': '#1e1e3f',
        'space-purple': '#6b21a8',
        'space-light': '#e0e0ff',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['"Exo 2"', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}