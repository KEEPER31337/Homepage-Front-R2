import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { ThemeProvider as MaterialTailwindProvider } from '@material-tailwind/react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

import './tailwind.css';
import materialTailwindTheme from '@constants/materialTailwindTheme';
import muiTheme from '@constants/muiTheme';
import { CookiesProvider } from 'react-cookie';
import App from './App';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

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
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <MaterialTailwindProvider value={materialTailwindTheme}>
          <MUIThemeProvider theme={muiTheme}>
            <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                <CookiesProvider>
                  <App />
                </CookiesProvider>
              </QueryClientProvider>
            </BrowserRouter>
          </MUIThemeProvider>
        </MaterialTailwindProvider>
      </LocalizationProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
