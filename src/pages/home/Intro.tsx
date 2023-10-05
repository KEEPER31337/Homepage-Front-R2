import React from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactComponent as LogoNeon } from '@assets/logo/logo_neon.svg';

const Intro = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const introText = isMobile
    ? "'지키다'라는 의미를 가진 단어\n'KEEP'에서 착안하여,\n정보보호에 관한 연구를 진행하고\n그 성과를 공유하기 위해\n만들어진 동아리입니다."
    : "'지키다'라는 의미를 가진 단어 'KEEP'에서 착안하여,\n정보보호에 관한 연구를 진행하고 그 성과를 공유하기 위해 만들어진 동아리입니다.";

  return (
    <div className="flex h-screen w-full flex-col place-content-center place-items-center sm:pt-header">
      <div className="space-y-10 sm:space-y-20">
        <LogoNeon className="mx-auto w-28 sm:w-96 md:w-[700px]" />
        <Typography variant="h3" className="whitespace-pre-wrap text-center !leading-8">
          {introText}
        </Typography>
      </div>
    </div>
  );
};

export default Intro;
