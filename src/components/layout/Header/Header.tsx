import React from 'react';
import { Link } from 'react-router-dom';

// local
import Logo from '../../../assets/keeper_logo.png';
import SignInBox from '../Sidebar/components/SignInBox';
import HeaderIcon from './components/HeaderIcon';

const Header = () => {
  return (
    <div className="flex h-[66px] border-t-0 border-r-0 border-b border-l-0 border-[#4CEEF9] bg-[#131316]">
      <div className="flex w-full items-center justify-between">
        <Link to="/">
          <img className="ml-[33px] h-[41px] w-[105px] object-cover" src={Logo} alt="" />
        </Link>
        <div className="mr-[19px]">
          <HeaderIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
