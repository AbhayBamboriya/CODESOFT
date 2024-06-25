/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        sans:["Playwrite MX", "cursive"],
        cursive:[ "Cedarville Cursive", "cursive"]
      },
      scrollbar: {
        width: 'thin',
        height: 'thin',
        color: {
          track: '#e4e4e4',
          thumb: '#888',
          hover: '#555',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          '::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '::-webkit-scrollbar-thumb': {
            background: '#888',
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        },
      });
    },
  ],
}

