import React, { useState } from 'react';

import { DateTime } from 'luxon';

interface countdownProps {
  startTime: DateTime;
  endTime: DateTime;
}

const Countdown = ({ startTime, endTime }: countdownProps) => {
  const [nowTime, setNowTime] = useState(DateTime.now());
  return <p className="text-white">02:30</p>;
};

export default Countdown;
