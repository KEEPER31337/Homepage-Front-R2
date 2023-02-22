import React from 'react';
import { ReactComponent as LogoNeon } from '@assets/logo/logo_neon.svg';

const introText =
  "'지키다'라는 의미를 가진 단어 'keep'에서 착안하여,\n정보보호에 관한 연구를 진행하고 그 성과를 공유하기 위해 만들어진 동아리입니다.";

const Home = () => {
  return (
    <div className="flex w-[calc(100vw-theme(space.sidebar))] bg-galaxy bg-contain bg-repeat">
      {/* Intro */}
      <div className="flex h-[calc(100vh-theme(space.header))] w-full flex-col">
        <div className="m-auto">
          <LogoNeon className="my-20 w-[700px]" />
          <p className="mx-auto whitespace-pre-wrap text-center text-white">{introText}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
