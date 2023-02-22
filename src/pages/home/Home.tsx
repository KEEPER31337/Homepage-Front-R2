import React from 'react';
import { ReactComponent as LogoNeon } from '@assets/logo/logo_neon.svg';

const Home = () => {
  return (
    <div className="flex w-[calc(100vw-theme(space.sidebar))] bg-galaxy bg-contain bg-repeat">
      <div className="flex h-screen w-full">
        <LogoNeon className="m-auto w-[700px]" />
      </div>
    </div>
  );
};

export default Home;
