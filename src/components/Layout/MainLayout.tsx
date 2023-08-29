import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="flex">
      <Header />
      <Sidebar />
      <Outlet />
      <Toaster position="top-left" />
    </div>
  );
};

export default MainLayout;
