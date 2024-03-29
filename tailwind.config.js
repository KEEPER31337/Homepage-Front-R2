/** @type {import('tailwindcss').Config} */
import { KEEPER_HEIGHT, KEEPER_COLOR, KEEPER_WIDTH } from './src/constants/keeperTheme';

export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    colors: {
      mainBlack: KEEPER_COLOR.mainBlack,
      middleBlack: KEEPER_COLOR.middleBlack,
      subBlack: KEEPER_COLOR.subBlack,
      pointBlue: KEEPER_COLOR.pointBlue,
      subGray: KEEPER_COLOR.subGray,
      subRed: KEEPER_COLOR.subRed,
      subOrange: KEEPER_COLOR.subOrange,
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
      header: KEEPER_HEIGHT.header.sm,
      sidebar: KEEPER_WIDTH.sidebar,
    },
    maxWidth: {
      container: KEEPER_WIDTH.container,
    },
    minWidth: {
      sidebar: KEEPER_WIDTH.sidebar,
    },
    backgroundImage: {
      galaxy: "url('/public/img/background_galaxy.png')",
    },
    keyframes: {
      typing: {
        '0%': {
          width: '0%',
          visibility: 'hidden',
        },
        '100%': {
          width: '100%',
        },
      },
      blink: {
        '50%': {
          borderColor: 'transparent',
        },
        '100%': {
          borderColor: 'white',
        },
      },
    },
    animation: {
      typing: 'typing 2s steps(25), blink',
    },
  },
};
export const plugins = [];
