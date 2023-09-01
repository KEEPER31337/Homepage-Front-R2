import React from 'react';
import { Divider, Menu, MenuItem, MenuList } from '@mui/material';
import { useSignOutMutation } from '@api/authApi';
import { MemberInfo } from '@api/dto';

interface AccountMenuProps {
  userInfo: MemberInfo;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const AccountMenu = ({ userInfo, anchorEl, open, onClose }: AccountMenuProps) => {
  const { mutate: logout } = useSignOutMutation();

  const handleLogOutClick = () => {
    logout();
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuList className="text-center">{userInfo.loginId}</MenuList>
      <Divider className="!my-1" />
      <MenuItem className="min-w-[150px]">프로필</MenuItem>
      <MenuItem className="min-w-[150px]" onClick={handleLogOutClick}>
        로그아웃
      </MenuItem>
    </Menu>
  );
};

export default AccountMenu;
