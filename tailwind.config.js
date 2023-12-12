/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
    },
    fontWeight:{
      extrabold:700,
      bold:400,
      boldF:600

    },
    backgroundColor:{
      reddark:'#ac3632',
      grayblue: '#9eadba',
      selectorgrey: "#dadada",
      sectiongrey: "#f2f2f2",
      sectiontext: "#d9965f",
      white: "#ffffff"
    },

    extend: {},
  },
  plugins: [],
};
