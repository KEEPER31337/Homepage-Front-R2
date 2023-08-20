import React from 'react';
import { Divider, Menu, MenuItem, MenuList } from '@mui/material';
import { MemberInfo } from '@api/dto';

interface AccountMenuProps {
  userInfo: MemberInfo;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const AccountMenu = ({ userInfo, anchorEl, open, onClose }: AccountMenuProps) => {
  const accountMenuList = [
    { id: 1, content: '프로필' },
    { id: 2, content: '로그아웃' },
  ];

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuList className="text-center">{userInfo.emailAddress}</MenuList>
      <Divider className="!my-1" />
      {accountMenuList.map((accountMenu) => (
        <MenuItem className="min-w-[150px]" key={accountMenu.id}>
          {accountMenu.content}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default AccountMenu;
