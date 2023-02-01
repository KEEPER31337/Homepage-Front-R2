/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      basic: ['GowunDodum-Regular'],
      title: ['CBNUJIKJI'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontSize: {
        h1: '28pt',
        h3: '20pt',
        paragraph: '16pt',
        small: '12pt',
      },
      colors: {
        mainBlack: '#131316',
        middleBlack: '#18181C',
        subBlack: '#26262C',
        pointBlue: '#4CEEF9',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
