import React, { Fragment } from 'react';
import { Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { VscAccount, VscCircleLargeFilled, VscGithubInverted } from 'react-icons/vsc';

const HeaderIcon = () => {
  return (
    <div className="relative flex w-[110px] justify-between">
      <a target="_blank" rel="noopener noreferrer" href="https://keeper.or.kr/wiki/%EB%8C%80%EB%AC%B8">
        <VscCircleLargeFilled className="h-[28px] w-[28px] fill-[#4CEEF9]" />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/KEEPER31337">
        <VscGithubInverted className="h-[28px] w-[28px] fill-[#4CEEF9]" />
      </a>
      <Menu>
        <MenuHandler>
          <div>
            <VscAccount className="h-[28px] w-[28px] fill-[#4CEEF9]" />
          </div>
        </MenuHandler>
        <MenuList>
          <MenuItem>
            <Link to="#!">프로필</Link>
          </MenuItem>
          <MenuItem>
            <Link to="#!">프로필 수정</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/">로그아웃</Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default HeaderIcon;
