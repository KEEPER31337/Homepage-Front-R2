import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';

const Header = () => {
  return (
    <AppBar position="fixed" className="h-header border-b border-pointBlue !bg-mainBlack !bg-none">
      <Toolbar className="flex justify-between">
        <Link to="/">
          <Logo className="h-8" />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
