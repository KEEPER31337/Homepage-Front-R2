import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Countdown from './Countdown';
import SeminarButton from './SeminarButton';
import SeminarInput from './SeminarInput';

const MemberCardComponent = () => {
  const [componentIncorrectAlert, setComponentIncorrectAlert] = useState(<p className="mb-[22px]" />);
  const [seminarExist, setSeminarExist] = useState(true); // TODO: api로 교체

  return seminarExist ? (
    <>
      <SeminarInput disabled={false} />
      <div className="mx-auto flex items-center justify-center text-small text-red-500">{componentIncorrectAlert}</div>
      <SeminarButton>출석</SeminarButton>
      <Countdown />
    </>
  ) : (
    <Typography className="text-center text-h3 font-bold">예정된 세미나가 없습니다.</Typography>
  );
};

export default MemberCardComponent;
