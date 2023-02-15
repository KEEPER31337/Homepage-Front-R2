import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

import './tailwind.css';
import theme from '@constants/materialTailwindTheme';
import muiTheme from '@constants/muiTheme';
import App from './App';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider value={theme}>
        <MUIThemeProvider theme={muiTheme}>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </BrowserRouter>
        </MUIThemeProvider>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
