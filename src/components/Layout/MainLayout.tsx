import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

import { CssBaseline } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <CssBaseline />
      <Header setMobileSidebarOpen={setMobileSidebarOpen} />
      <Sidebar mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} />
      <Outlet />
      <Toaster position="top-left" />
    </div>
  );
};

export default MainLayout;
