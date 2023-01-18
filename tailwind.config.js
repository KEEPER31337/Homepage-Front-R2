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
      colors: {
        mainHeader: 'rgb(255,255,255,0)',
        mainBlack: '#000000',
        mainWhite: '#ffffff',
        mainYellow: '#fbbf24',
        pointYellow: '#f59e0b',
        backGray: '#efefef',
        divisionGray: '#e0e0e0',
        darkComponent: '#1f2937',
        darkPoint: '#111827',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
