import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { VscAccount, VscGithubInverted, VscThreeBars } from 'react-icons/vsc';
import { useRecoilValue } from 'recoil';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import { HEADER_HEIGHT } from '@constants/keeperTheme';
import memberState from '@recoil/member.recoil';
import FilledButton from '@components/Button/FilledButton';
import AccountMenu from './Menu/AccountMenu';

const Header = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userInfo = useRecoilValue(memberState);
  const profileMenuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleAccountIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      className="h-14 border-b border-pointBlue !bg-mainBlack !bg-none sm:h-header"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: HEADER_HEIGHT }}
    >
      <Toolbar className="flex items-center justify-between">
        <div className="flex items-center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: { xs: 1, sm: 2 }, display: { lg: 'none' } }}
          >
            <VscThreeBars />
          </IconButton>
          <Link to="/">
            <Logo className="h-6 sm:h-8" />
          </Link>
        </div>
        {userInfo ? (
          <>
            <div>
              <IconButton target="_blank" href="https://keeper.or.kr/wiki/%EB%8C%80%EB%AC%B8">
                <Typography className="h-6 w-6 rounded-full bg-pointBlue text-mainBlack">W</Typography>
              </IconButton>
              <IconButton target="_blank" href="https://github.com/KEEPER31337">
                <VscGithubInverted fill="#4CEEF9" />
              </IconButton>
              <IconButton edge="end" onClick={handleAccountIconClick}>
                <VscAccount fill="#4CEEF9" />
              </IconButton>
            </div>
            <AccountMenu userInfo={userInfo} anchorEl={anchorEl} open={profileMenuOpen} onClose={handleMenuClose} />
          </>
        ) : (
          <Link to="/login">
            <FilledButton>LOGIN</FilledButton>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
