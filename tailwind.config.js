/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          dark: "#330000",
          mid: "#660000",
          light: "#990000",
        },
      },
    },
  },
  plugins: [],
}
