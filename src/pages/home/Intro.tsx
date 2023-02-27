import React from 'react';
import { ReactComponent as LogoNeon } from '@assets/logo/logo_neon.svg';
import { Typography } from '@material-tailwind/react';

const introText =
  "'지키다'라는 의미를 가진 단어 'keep'에서 착안하여,\n정보보호에 관한 연구를 진행하고 그 성과를 공유하기 위해 만들어진 동아리입니다.";

const Intro = () => {
  return (
    <div className="flex h-[calc(100vh-theme(space.header))] w-full flex-col place-content-center place-items-center">
      <div className="space-y-24">
        <LogoNeon className="w-[700px]" />
        <Typography variant="h3" className="whitespace-pre-wrap text-center">
          {introText}
        </Typography>
      </div>
    </div>
  );
};

export default Intro;
