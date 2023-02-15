import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { ThemeProvider, Card, CardBody, Typography, Input, Button, Select, Option } from '@material-tailwind/react';
import FilledButton from '@components/Button/FilledButton';
import DoAttend from './DoAttend';
import SetSeminar from './SetSeminar';

const SeminarAttend = () => {
  let today: string;
  const [seminarDate, setSeminarDate] = useState('today');
  const [tempIsBoss, setTempIsBoss] = useState(true);

  useEffect(() => {
    today = DateTime.now().toISO().substr(2, 8).replaceAll('-', '.');
    setSeminarDate(today);
  }, []);

  return (
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
  );
};

export default SeminarAttend;
