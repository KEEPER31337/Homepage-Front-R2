import React from 'react';
import { Drawer, Toolbar } from '@mui/material';
import { KEEPER_COLOR, SIDEBAR_WIDTH } from '@constants/keeperTheme';

const Sidebar = () => {
  return (
    <Drawer
      className="h-screen w-sidebar"
      variant="permanent"
      sx={{
        display: { sm: 'block', xs: 'none' },
        [`& .MuiDrawer-paper`]: { width: SIDEBAR_WIDTH, bgcolor: KEEPER_COLOR.mainBlack },
      }}
    >
      <Toolbar />
    </Drawer>
  );
};

export default Sidebar;
