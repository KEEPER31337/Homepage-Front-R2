import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import OutlinedButton from '@components/Button/OutlinedButton';
import FilledButton from '@components/Button/FilledButton';
import PageTitle from '@components/Typography/PageTitle';
import { Typography } from '@mui/material';
import SeminarCard from './Card/SeminarCard';
import BossCardContent from './Card/BossCardContent';
import MemberCardContent from './Card/MemberCardContent';

const SeminarAttend = () => {
  const [seminarDate, setSeminarDate] = useState('today');
  const seminarActivated = true; // TODO: useState, api 적용
  const [isBoss, setIsBoss] = useState(true); // TODO: api 적용

  useEffect(() => {
    setSeminarDate(DateTime.now().toFormat('yy.MM.dd'));
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <PageTitle>세미나 출석</PageTitle>
        <OutlinedButton>세미나 관리</OutlinedButton>
      </div>
      <div className="flex h-screen items-center justify-center">
        <SeminarCard>
          {seminarActivated ? (
            <>
              <Typography className="mt-[40px] text-center !text-h3 !font-bold text-white">
                {seminarDate} 세미나
              </Typography>
              {isBoss ? <BossCardContent /> : <MemberCardContent />}
            </>
          ) : (
            <Typography className="text-center !text-h3 !font-bold">예정된 세미나가 없습니다.</Typography>
          )}
        </SeminarCard>
        {isBoss ? (
          <FilledButton onClick={() => setIsBoss(false)}>회원권한페이지로</FilledButton>
        ) : (
          <FilledButton onClick={() => setIsBoss(true)}>회장권한페이지로</FilledButton>
        )}
      </div>
    </>
  );
};

export default SeminarAttend;
