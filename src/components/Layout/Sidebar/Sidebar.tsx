import React from 'react';
import { Drawer, Toolbar } from '@mui/material';
import { Role } from '@api/dto';
import CATEGORIES from '@constants/category';
import { KEEPER_COLOR, SIDEBAR_WIDTH } from '@constants/keeperTheme';
import useCheckAuth from '@hooks/useCheckAuth';
import CategoryNav from '@components/Navigation/CategoryNav';

const Sidebar = () => {
  const executiveRoles: Role[] = ['ROLE_회장', 'ROLE_부회장', 'ROLE_서기', 'ROLE_총무', 'ROLE_사서'];
  const { checkIncludeOneOfAuths } = useCheckAuth();

  return (
    <Drawer
      className="h-screen w-sidebar"
      variant="permanent"
      sx={{
        display: { lg: 'block', xs: 'none' },
        [`& .MuiDrawer-paper`]: { width: SIDEBAR_WIDTH, bgcolor: KEEPER_COLOR.mainBlack },
      }}
    >
      <Toolbar />
      {CATEGORIES.map((category) => {
        if (category.path === 'admin' && !checkIncludeOneOfAuths(executiveRoles)) {
          return null;
        }
        return <CategoryNav key={category.id} category={category} />;
      })}
    </Drawer>
  );
};

export default Sidebar;
