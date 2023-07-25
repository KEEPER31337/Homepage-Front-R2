import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

import './tailwind.css';
import muiTheme from '@constants/muiTheme';
import App from './App';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <MUIThemeProvider theme={muiTheme}>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </BrowserRouter>
        </MUIThemeProvider>
      </LocalizationProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
);
