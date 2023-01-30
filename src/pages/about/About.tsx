import React from 'react';
import MainLogo from '../../assets/img/keeper_main_logo.png';

const About = () => {
  return (
    <div className="flex bg-galaxy bg-contain bg-repeat">
      <div className="flex h-[100vh] w-full">
        <div className="m-auto">
          <img src={MainLogo} width={800} alt="keeper_main_logo" />
        </div>
      </div>
    </div>
  );
};

export default About;
