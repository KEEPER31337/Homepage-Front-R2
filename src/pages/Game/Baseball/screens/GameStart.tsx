import React from 'react';
import { GameInfo } from '../api/baseballDto';

interface GameStartProps {
  gameInfo: GameInfo;
  onStart: () => void;
  bettingPoint: string;
  setBettingPoint: React.Dispatch<React.SetStateAction<string>>;
}

const GameStart = ({ gameInfo, onStart, bettingPoint, setBettingPoint }: GameStartProps) => {
  return (
    <div className="flex h-full w-full flex-col place-content-center place-items-center">
      <div className="mx-10 mb-16 text-[40px] font-bold text-pointBlue md:mb-10">BASEBALL GAME</div>
      <div className="mb-10 text-center text-xl md:text-2xl">betting your point...</div>
      <input
        value={bettingPoint}
        onChange={(e) => {
          const value = e.target.value.replace(/[^0-9]/g, '');
          if (value === '0') setBettingPoint(String(gameInfo.minBettingPoint));
          else if (gameInfo.maxBettingPoint < Number(value)) setBettingPoint(String(gameInfo.maxBettingPoint));
          else setBettingPoint(value);
        }}
        className="mb-20 w-72 border-[1px] border-pointBlue bg-transparent text-center text-[40px] focus:outline-none md:w-[400px]"
        type="text"
        placeholder={`${gameInfo.minBettingPoint} ~ ${gameInfo.maxBettingPoint}`}
      />
      <button
        disabled={parseInt(bettingPoint, 10) < gameInfo.minBettingPoint || bettingPoint === ''}
        className="text-2xl enabled:hover:text-pointBlue disabled:text-gray-500"
        onClick={onStart}
        type="button"
      >
        START
      </button>
    </div>
  );
};

export default GameStart;
