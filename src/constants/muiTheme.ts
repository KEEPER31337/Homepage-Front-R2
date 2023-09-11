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
    h1: {
      fontSize: '28px',
    },
    h3: {
      fontSize: '20px',
    },
    paragraph: {
      fontSize: '14px',
    },
    small: {
      fontSize: '10px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            colorScheme: 'dark',
            WebkitBackgroundClip: 'text !important',
          },
        },
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface TypographyVariants {
    paragraph: React.CSSProperties;
    small: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    paragraph?: React.CSSProperties;
    small?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    paragraph: true;
    small: true;
  }
}

export default muiTheme;
