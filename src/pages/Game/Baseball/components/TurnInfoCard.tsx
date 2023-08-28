import React from 'react';
import { ResultInfo } from '../api/baseballDto';

interface TurnInfoCardProps {
  index: number;
  status: 'Ready' | 'Playing' | 'Finished';
  result?: ResultInfo | null;
}

const TurnInfoCard = ({ index, status, result }: TurnInfoCardProps) => {
  return (
    <div
      className={`flex border-2 bg-mainBlack text-xl ${
        status === 'Playing' ? 'border-pointBlue' : 'border-transparent'
      }`}
    >
      <p className={`w-12 text-right ${status === 'Playing' ? 'text-pointBlue' : 'text-pointGray'}`}>{index}</p>
      <p className="w-32 text-center">{status === 'Finished' && result === null ? '❌' : result?.guessNumber}</p>
      <p className="w-14 tracking-widest">
        {result?.strike && result?.strike !== 0 ? '🟢' : '⚫️'} {result?.strike}
      </p>
      <p className="w-16 tracking-widest">
        {result?.ball && result?.ball !== 0 ? '🟡' : '⚫️'} {result?.ball}
      </p>
    </div>
  );
};

export default TurnInfoCard;
