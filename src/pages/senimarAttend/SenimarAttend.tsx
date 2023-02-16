import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { ThemeProvider, Card, CardBody, Typography, Input, Button, Select, Option } from '@material-tailwind/react';
import FilledButton from '@components/Button/FilledButton';
import PageTitle from '@components/Typography/PageTitle';
import DoAttend from './DoAttend';
import SetSeminar from './SetSeminar';

const SeminarAttend = () => {
  const [seminarDate, setSeminarDate] = useState('today');
  const [tempIsBoss, setTempIsBoss] = useState(true);

  useEffect(() => {
    setSeminarDate(DateTime.now().toFormat('yy.MM.dd'));
  }, []);

  const [attendValue, setAttendValue] = useState('5분');
  const [lateAttendValue, setLateAttendValue] = useState('5분');

  const handleAttendChange = (value: string) => {
    setAttendValue(value);
  };
  const handleLateChange = (value: string) => {
    setLateAttendValue(value);
  };

  return (
    <>
      <PageTitle>세미나 출석체크</PageTitle>
      <div className="grid justify-items-end">
        <FilledButton>세미나 관리</FilledButton>
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
