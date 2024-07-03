/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:["Playwrite MX", "cursive"],
        cursive:[ "Cedarville Cursive", "cursive"]
      },
    },
  },
  plugins: [],
}

