import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="fixed" className="h-header border-b border-pointBlue !bg-mainBlack !bg-none">
      <Toolbar />
    </AppBar>
  );
};

export default Header;
