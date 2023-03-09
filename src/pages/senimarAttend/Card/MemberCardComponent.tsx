import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Countdown from '../Countdown/Countdown';
import SeminarButton from '../Button/SeminarButton';
import SeminarInput from '../Input/SeminarInput';

const MemberCardComponent = () => {
  const [componentIncorrectAlert, setComponentIncorrectAlert] = useState(<p className="mb-[22px]" />);

  return (
    <>
      <SeminarInput disabled={false} />
      <div className="mx-auto flex items-center justify-center text-small text-red-500">{componentIncorrectAlert}</div>
      <SeminarButton>출석</SeminarButton>
      <Countdown />
    </>
  );
};

export default MemberCardComponent;
