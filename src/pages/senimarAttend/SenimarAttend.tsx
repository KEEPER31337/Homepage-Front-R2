import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import OutlinedButton from '@components/Button/OutlinedButton';
import PageTitle from '@components/Typography/PageTitle';
import DoAttend from './DoAttend';
import SetSeminar from './SetSeminar';

const SeminarAttend = () => {
  const [seminarDate, setSeminarDate] = useState('today');
  const [tempIsBoss, setTempIsBoss] = useState(true);

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
        {tempIsBoss ? (
          <div>
            <FilledButton onClick={() => setTempIsBoss(false)}>회원권한페이지로</FilledButton>
            <SetSeminar seminarDate={seminarDate} />
          </div>
        ) : (
          <div>
            <FilledButton onClick={() => setTempIsBoss(true)}>회장권한페이지로</FilledButton>
            <DoAttend seminarDate={seminarDate} />
          </div>
        )}
      </div>
    </>
  );
};

export default SeminarAttend;
