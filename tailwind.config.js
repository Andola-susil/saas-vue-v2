/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./src/**/*.html', './src/**/*.vue'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

