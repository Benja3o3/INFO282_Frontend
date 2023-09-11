/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/App.tsx',
    './src/components/Map.tsx',
    './src/components/Charts.tsx',
    './src/components/Indicator.tsx',
    './src/components/IndicatorTable.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}

