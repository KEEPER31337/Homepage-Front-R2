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
        subGray: '#575E69',
        subRed: '#EF4444',
        subBlue: '#56CFE1',
      },
      fontFamily: {
        base: 'IBM Plex Sans KR, system-ui, sans-serif',
      },
      fontSize: {
        h1: '28pt',
        h3: '20pt',
        paragraph: '16pt',
        small: '12pt',
      },
      spacing: {
        header: '66px',
        sidebar: '320px',
      },
      maxWidth: {
        container: '1080px',
      },
      minWidth: {
        sidebar: '320px',
      },
    },
  },
  plugins: [],
});
