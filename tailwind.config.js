/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5850EC',
        primary_hover: '#2c22e7',
        secondary: '#ec5096',
        secondary_hover: '#e7227a' 
      },
    },
  },
  plugins: [],
}