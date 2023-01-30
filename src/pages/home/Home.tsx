import React from 'react';
import MainLogo from '../../assets/img/keeper_main_logo.png';

const Home = () => {
  return (
    <div className="flex bg-galaxy bg-contain bg-repeat">
      <div className="flex h-[100vh] w-full">
        <div className="m-auto">
          <img src={MainLogo} width={800} alt="keeper_main_logo" />
          <p className="mx-auto text-center text-white">‘지키다’라는 의미를 가진 단어 ‘keep’에서 착안하여,</p>
          <p className="mx-auto text-center text-white">
            정보보호에 관한 연구를 진행하고 그 성과를 공유하기 위해 만들어진 동아리입니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
