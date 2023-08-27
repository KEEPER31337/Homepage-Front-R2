import React, { useState, useRef, useEffect } from 'react';
import { ResultInfo } from '../api/baseballDto';

export type InfoType = 'next' | 'result';

interface InfoModalProps {
  onClose: () => void;
  infoType: InfoType;
  result?: ResultInfo | null;
}

const InfoModal = ({ onClose, infoType, result }: InfoModalProps) => {
  const msg = {
    next: {
      main: "time's up",
      sub: 'NEXT TURN',
    },
    result: {
      main: result?.guessNumber,
      sub: (
        <>
          STRIKE <span className="mr-4 text-pointBlue">{result?.strike}</span>
          BALL <span className="text-pointBlue">{result?.ball}</span>
        </>
      ),
    },
  };

  const [count, setCount] = useState(3);
  const interval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    interval.current = setInterval(() => {
      setCount((cnt) => cnt - 1);
    }, 1000);

    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    if (count === 1) {
      clearInterval(interval.current);
      onClose();
    }
  }, [count]);

  return (
    <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/50 p-5">
      <div className="flex h-[260px] w-[490px] flex-col justify-center space-y-4 border bg-black text-center text-3xl drop-shadow-[0px_0px_5px_rgba(76,238,249,0.3)] md:text-4xl">
        <p>{msg[infoType].main}</p>
        <p className="drop-shadow-[0px_0px_1px_rgba(76,238,249,1)]">{msg[infoType].sub}</p>
      </div>
    </div>
  );
};

export default InfoModal;
