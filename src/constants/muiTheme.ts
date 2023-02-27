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
});

export default muiTheme;
