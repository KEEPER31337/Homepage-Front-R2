import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import { VscGithubInverted, VscAccount } from 'react-icons/vsc';

const Header = () => {
  return (
    <AppBar position="fixed" className="h-header border-b border-pointBlue !bg-mainBlack !bg-none">
      <Toolbar className="flex justify-between">
        <Link to="/">
          <Logo className="h-8" />
        </Link>
        <div>
          <IconButton target="_blank" href="https://keeper.or.kr/wiki/%EB%8C%80%EB%AC%B8">
            <Typography className=" h-6 w-6 rounded-full bg-pointBlue text-mainBlack">W</Typography>
          </IconButton>
          <IconButton target="_blank" href="https://github.com/KEEPER31337">
            <VscGithubInverted fill="#4CEEF9" />
          </IconButton>
          <IconButton>
            <VscAccount fill="#4CEEF9" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
