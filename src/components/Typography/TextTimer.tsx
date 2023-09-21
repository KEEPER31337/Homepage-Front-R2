import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';

interface TextTimerProps {
  expirationTime: DateTime;
}

const TextTimer = ({ expirationTime }: TextTimerProps) => {
  const [remainingSeconds, setRemainingSeconds] = useState(
    Math.floor(expirationTime.diff(DateTime.now()).as('seconds')),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingSeconds <= 0) {
        clearInterval(interval);
        return;
      }

      setRemainingSeconds(Math.floor(expirationTime.diff(DateTime.now()).as('seconds')));
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSeconds]);

  return <Typography>{DateTime.fromSeconds(remainingSeconds).toFormat('mm:ss')}</Typography>;
};

export default TextTimer;
