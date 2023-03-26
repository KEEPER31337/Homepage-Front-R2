import React, { useState, useEffect, useRef } from 'react';

import { DateTime, Duration } from 'luxon';

interface countdownProps {
  startTime: DateTime;
  endTime: DateTime;
}

const Countdown = ({ startTime, endTime }: countdownProps) => {
  const [nowTime, setNowTime] = useState(DateTime.now());
  const id: { current: NodeJS.Timeout | undefined } = useRef();
  const [diff, setDiff] = useState<Duration>(endTime.diff(startTime));
  const [leftTime, setLeftTime] = useState('');

  const changeNowTime = () => {
    setNowTime(DateTime.now());
  };

  useEffect(() => {
    id.current = setInterval(changeNowTime, 1000);
    return () => clearInterval(id.current);
  }, [nowTime]);

  useEffect(() => {
    if (id.current) setLeftTime(endTime > nowTime ? diff.toFormat('mm:ss') : '마감');
  }, [diff]);

  useEffect(() => {
    setDiff(endTime.diff(nowTime));
  }, [nowTime]);

  return <p className="text-white">{startTime > nowTime ? endTime.diff(startTime).toFormat('mm:ss') : leftTime}</p>;
};

export default Countdown;
