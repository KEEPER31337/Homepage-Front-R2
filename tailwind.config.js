/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mainBlack: '#131316',
        middleBlack: '#18181C',
        subBlack: '#26262C',
        pointBlue: '#4CEEF9',
      },
    },
  },
  plugins: [],
});
