/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      'colors': {
        'primary': '#2D4722',
        'secondary': '#F2C851',
      }
    },
  },
  plugins: [],
}
