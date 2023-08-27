import React, { useRef, useState, useEffect } from 'react';

interface CountdownBarProps {
  isTurnStart: boolean;
  initialTimePerTurn: number;
  turnRemainTime: number;
  setTurnRemainTime: React.Dispatch<React.SetStateAction<number>>;
}

const CountdownBar = ({ isTurnStart, initialTimePerTurn, turnRemainTime, setTurnRemainTime }: CountdownBarProps) => {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const countPercentage = ((turnRemainTime - 1) / (initialTimePerTurn - 1)) * 100;
  const [animation, setAnimation] = useState('transition-all duration-1000 ease-linear');

  const countdownStart = () => {
    if (!interval.current) {
      interval.current = setInterval(() => {
        setTurnRemainTime((cnt) => cnt - 1);
      }, 1000);
    }
  };

  const countdownStop = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  };

  useEffect(() => {
    if (turnRemainTime === 0) {
      countdownStop();
      setAnimation('transition-none');
    } else if (turnRemainTime === initialTimePerTurn) setAnimation('transition-all duration-1000 ease-linear');
  }, [turnRemainTime]);

  useEffect(() => {
    if (isTurnStart === true) {
      setTurnRemainTime(initialTimePerTurn);
      countdownStart();
    } else countdownStop();
  }, [isTurnStart]);

  return (
    <div>
      <div className="bg-pointGray h-6 md:w-[350px]">
        <div style={{ width: `${countPercentage}%` }} className={`h-6 bg-pointBlue ${animation}`} />
      </div>
    </div>
  );
};

export default CountdownBar;
