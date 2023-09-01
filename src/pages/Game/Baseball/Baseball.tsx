import React, { useEffect, useState } from 'react';
import GameStart from './screens/GameStart';
import GamePlay from './screens/GamePlay';
import { useGameStartMutation, useGetBaseBallStatusQuery, useGetGameInfoQuery } from './api/baseballApi';

const Baseball = () => {
  const [bettingPoint, setBettingPoint] = useState<string>('');
  const [playMode, setPlayMode] = useState(false);
  const { data: gameInfo } = useGetGameInfoQuery();
  const { mutate: gameStart, data: startData } = useGameStartMutation();
  const { data: baseballStatus } = useGetBaseBallStatusQuery();

  const handleStart = () => {
    gameStart(
      { bettingPoint: Number(bettingPoint) },
      {
        onSuccess: () => {
          setPlayMode(true);
        },
      },
    );
  };

  useEffect(() => {
    if (!baseballStatus || baseballStatus.status === 'NOT_START') {
      setPlayMode(false);
      return;
    }
    setPlayMode(true);
  }, [baseballStatus]);

  if (!gameInfo || !baseballStatus) return null;
  return (
    <div className="relative grid h-full select-none place-items-center bg-mainBlack font-orbitron">
      {playMode ? (
        <GamePlay
          isPlaying={baseballStatus.status === 'PLAYING'}
          gameInfo={gameInfo}
          initEarnablePoint={startData?.earnablePoint ?? 0}
        />
      ) : (
        <GameStart
          gameInfo={gameInfo}
          onStart={handleStart}
          bettingPoint={bettingPoint}
          setBettingPoint={setBettingPoint}
        />
      )}
    </div>
  );
};

export default Baseball;
