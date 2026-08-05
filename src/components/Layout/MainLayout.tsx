import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

import { CssBaseline } from '@mui/material';
import { KEEPER_COLOR } from '@constants/keeperTheme';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <CssBaseline />
      <Header setMobileSidebarOpen={setMobileSidebarOpen} />
      <Sidebar mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} />
      <Outlet />
      <Toaster
        position="top-left"
        toastOptions={{
          style: {
            background: KEEPER_COLOR.subBlack,
            border: `1px solid ${KEEPER_COLOR.subGray}`,
            boxShadow: '0 8px 24px rgb(0 0 0 / 35%)',
            color: 'white',
          },
          success: {
            iconTheme: {
              primary: KEEPER_COLOR.pointBlue,
              secondary: KEEPER_COLOR.subBlack,
            },
          },
          error: {
            iconTheme: {
              primary: KEEPER_COLOR.subRed,
              secondary: KEEPER_COLOR.subBlack,
            },
          },
        }}
      />
    </div>
  );
};

export default MainLayout;
