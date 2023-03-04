import React from 'react';
import { Menu, MenuItem } from '@mui/material';

interface AccountMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const AccountMenu = ({ anchorEl, open, onClose }: AccountMenuProps) => {
  const accountMenuList = [
    { id: 1, content: '프로필' },
    { id: 2, content: '로그아웃' },
  ];

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {accountMenuList.map((accountMenu) => (
        <MenuItem className="min-w-[150px]" key={accountMenu.id}>
          {accountMenu.content}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default AccountMenu;
