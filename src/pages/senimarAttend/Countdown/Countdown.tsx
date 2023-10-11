import React from 'react';

import { DateTime } from 'luxon';
import TextTimer from '@components/Typography/TextTimer';

interface countdownProps {
  startTime: DateTime | null;
  endTime: DateTime | null;
}

const Countdown = ({ startTime, endTime }: countdownProps) => {
  const renderCountdownText = () => {
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

    return <TextTimer expirationTime={endTime} />;
  };

  return <div>{renderCountdownText()}</div>;
};

export default Countdown;
