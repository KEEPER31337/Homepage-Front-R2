/** @type {import('tailwindcss').Config} */

module.exports = {
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
        subOrange: '#FFA500',
      },
      fontFamily: {
        base: 'IBM Plex Sans KR, system-ui, sans-serif',
        orbitron: '"Orbitron", sans-serif',
      },
      fontSize: {
        h1: '28px',
        h3: '20px',
        paragraph: '14px',
        small: '10px',
      },
      spacing: {
        header: '66px',
        sidebar: '240px',
      },
      maxWidth: {
        container: '1080px',
      },
      minWidth: {
        sidebar: '240px',
      },
      backgroundImage: {
        galaxy: "url('/public/img/background_galaxy.png')",
      },
    },
  },
  plugins: [],
};
