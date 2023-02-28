import React from 'react';
import { Drawer, Toolbar } from '@mui/material';
import { KEEPER_COLOR, SIDEBAR_WIDTH } from '@constants/keeperTheme';
import CATEGORIES from '@constants/category';
import CategoryNav from '@components/Navigation/CategoryNav';

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
      {CATEGORIES.map((category) => (
        <CategoryNav key={category.id} category={category} />
      ))}
    </Drawer>
  );
};

export default Sidebar;
