import React from 'react';
import { Button, Drawer, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { VscBug } from 'react-icons/vsc';
import { Role } from '@api/dto';
import CATEGORIES from '@constants/category';
import { KEEPER_COLOR, SIDEBAR_WIDTH } from '@constants/keeperTheme';
import useCheckAuth from '@hooks/useCheckAuth';
import CategoryNav from '@components/Navigation/CategoryNav';

interface SidebarProps {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ mobileSidebarOpen, setMobileSidebarOpen }: SidebarProps) => {
  const executiveRoles: Role[] = ['ROLE_회장', 'ROLE_부회장', 'ROLE_서기', 'ROLE_총무', 'ROLE_사서'];
  const { checkIncludeOneOfAuths } = useCheckAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Drawer
      className="h-screen w-sidebar"
      variant={isMobile ? 'temporary' : 'permanent'}
      open={mobileSidebarOpen}
      onClose={() => setMobileSidebarOpen(false)}
      sx={{
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
      <div className="my-4 flex h-full items-end justify-center">
        <Button target="_blank" href="#">
          <VscBug className="mr-2" />
          버그 및 개선 사항 제보
        </Button>
      </div>
    </Drawer>
  );
};

export default Sidebar;
