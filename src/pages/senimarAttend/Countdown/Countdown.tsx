import React, { useEffect, useState } from 'react';

import { DateTime } from 'luxon';
import TextTimer from '@components/Typography/TextTimer';

interface countdownProps {
  startTime: DateTime | null;
  endTime: DateTime | null;
  isTransitionTime?: boolean;
  setIsTransitionTime?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Countdown = ({ startTime, endTime, isTransitionTime, setIsTransitionTime }: countdownProps) => {
  const [text, setText] = useState<string | JSX.Element>('--:--');

  const getRenderCountdownText = () => {
    if (setIsTransitionTime) setIsTransitionTime(false);
    const now = DateTime.now();

    if (!startTime || !endTime) {
      return '--:--';
    }
    if (now < startTime) {
      return endTime.diff(startTime).toFormat('mm:ss');
    }
    if (now > endTime) {
      return '마감';
    }

    return <TextTimer expirationTime={endTime} setIsEnd={setIsTransitionTime} />;
  };

  useEffect(() => {
    setText(getRenderCountdownText());
  }, [startTime, endTime, isTransitionTime]);

  return <div>{text}</div>;
};

export default Countdown;
