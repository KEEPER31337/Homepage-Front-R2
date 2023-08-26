import React from 'react';
import TurnInfoCard from './TurnInfoCard';
import { ResultInfo } from '../api/baseballDto';

interface TurnInfoBoardProps {
  isWin: boolean;
  results: Array<ResultInfo | null>;
  round: number;
}

const TurnInfoBoard = ({ isWin, results, round }: TurnInfoBoardProps) => {
  const renderList: Array<'Ready' | 'Playing' | 'Finished'> = Array.from({ length: round }, (v, i) => {
    if (isWin) return 'Finished';
    if (i === results.length) return 'Playing';
    if (i > results.length) return 'Ready';
    return 'Finished';
  });
  return (
    <div className="mb-4">
      {renderList.map((status, index) => (
        /* eslint-disable react/no-array-index-key */
        <TurnInfoCard key={index} index={index + 1} result={results?.[index]} status={status} />
      ))}
    </div>
  );
};

export default TurnInfoBoard;
