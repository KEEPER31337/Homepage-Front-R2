import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4CEEF9',
    },
    secondary: {
      main: '#26262C',
      contrastText: '#4CEEF9',
    },
  },
  typography: {
    fontFamily: ['IBM Plex Sans KR', 'system-ui', 'sans-serif'].join(','),
  },
});

export default muiTheme;
