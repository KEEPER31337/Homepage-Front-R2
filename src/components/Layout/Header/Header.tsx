import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import { VscGithubInverted, VscAccount } from 'react-icons/vsc';
import AccountMenu from './Menu/AccountMenu';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAccountIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
          <IconButton onClick={handleAccountIconClick}>
            <VscAccount fill="#4CEEF9" />
          </IconButton>
        </div>
      </Toolbar>
      <AccountMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose} />
    </AppBar>
  );
};

export default Header;
