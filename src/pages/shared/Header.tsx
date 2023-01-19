import React from 'react';
import { Popover } from '@headlessui/react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

// local
import Logo from '../../assets/keeper_logo.png';
import SignInBox from './Component/SignInBox';
import HeaderIcon from './Component/HeaderIcon';

const Header: React.FC = () => {
  // const jobs = member?.memberInfo?.jobs;

  return (
    <Popover className="flex h-[66px] bg-[#131316] border-t-0 border-r-0 border-b border-l-0 border-[#4CEEF9]">
      <div className="flex w-full items-center justify-between">
        <Link to="/">
          <img className="ml-[33px] w-[105px] h-[41px] object-cover" src={Logo} alt="" />
        </Link>
        <div className="mr-[19px]">
          <HeaderIcon />
        </div>
      </div>
    </Popover>
  );
};

export default Header;
