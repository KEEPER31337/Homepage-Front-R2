import React, { useEffect, useRef, useState } from 'react';
import { CiBaseball } from 'react-icons/ci';
import { AuthCodeRef } from 'react-auth-code-input';
import PointInfo from '../components/PointInfo';
import CountdownBar from '../components/CountdownBar';
import TurnInfoBoard from '../components/TurnInfoBoard';
import NumberInput from '../components/NumberInput';
import InfoModal, { InfoType } from '../components/InfoModal';
import { useGuessMutation, useGetResultQuery } from '../api/baseballApi';
import { GameInfo, ResultInfo } from '../api/baseballDto';
import NoticeEnd from '../components/NoticeEnd';

const INITIAL_TIME_PER_TURN = 30;

interface GamePlayProps {
  isPlaying: boolean;
  gameInfo: GameInfo;
  initEarnablePoint: number;
}

const GamePlay = ({ isPlaying, gameInfo, initEarnablePoint }: GamePlayProps) => {
  const [isTurnStart, setIsTurnStart] = useState(true);
  const [guessNumber, setGuessNumber] = useState('');
  const isDuplicated = guessNumber.length !== new Set(guessNumber).size;
  const [gameResults, setGameResults] = useState<(ResultInfo | null)[]>([]);
  const [earnablePoint, setEarnablePoint] = useState(initEarnablePoint);
  const [turnRemainTime, setTurnRemainTime] = useState(INITIAL_TIME_PER_TURN);
  const [infoModalSetting, setInfoModalSetting] = useState<{
    type: InfoType;
    result: ResultInfo | null;
  }>({
    type: 'result',
    result: null,
  });
  const { data: currentGameCondition, refetch: refetchCurrentGameCondition } = useGetResultQuery();
  const isWin: boolean = gameResults.at(-1)?.strike === gameInfo.guessNumberLength ?? false;
  const isLose: boolean = (gameResults.length === gameInfo.tryCount && !isWin) ?? false;

  const AuthInputRef = useRef<AuthCodeRef>(null);
  const { mutate: guess } = useGuessMutation();

  const handleGuessClick = () => {
    guess(
      { guessNumber },
      {
        onSuccess: (data) => {
          AuthInputRef.current?.clear();
          setInfoModalSetting({ type: 'result', result: data.results.at(-1) });
          setIsTurnStart(false);
        },
      },
    );
  };

  useEffect(() => {
    if (isPlaying && turnRemainTime === 0) {
      setInfoModalSetting({
        type: 'next',
        result: null,
      });
      refetchCurrentGameCondition();
      setIsTurnStart(false);
    }
  }, [turnRemainTime]);

  useEffect(() => {
    if (currentGameCondition) {
      setGameResults(currentGameCondition.results);
      setEarnablePoint(currentGameCondition.earnablePoint);
      setTurnRemainTime(currentGameCondition.remainedSecond);
    }
  }, [currentGameCondition]);

  return (
    <div>
      <PointInfo earnablePoint={earnablePoint} />
      <div className="mt-6 space-y-8 md:mt-4 md:space-y-6">
        <CountdownBar
          isTurnStart={!isWin && !isLose && isTurnStart}
          initialTimePerTurn={INITIAL_TIME_PER_TURN}
          turnRemainTime={turnRemainTime}
          setTurnRemainTime={setTurnRemainTime}
        />
        <TurnInfoBoard isWin={isWin} results={gameResults} round={gameInfo.tryCount} />
        {!isWin && !isLose && (
          <div className="flex items-center space-x-4">
            <NumberInput
              AuthInputRef={AuthInputRef}
              onChange={(res: string) => setGuessNumber(res)}
              error={isDuplicated}
            />
            <button
              type="button"
              className="group enabled:cursor-pointer enabled:hover:rounded-full enabled:hover:bg-pointBlue/20"
              onClick={handleGuessClick}
              disabled={guessNumber.length !== gameInfo.guessNumberLength || isDuplicated}
            >
              <CiBaseball size={50} className="fill-pointBlue group-disabled:fill-pointBlue/20" />
            </button>
          </div>
        )}
      </div>
      {!isTurnStart && (
        <InfoModal
          infoType={infoModalSetting.type}
          result={infoModalSetting.result}
          onClose={() => {
            setIsTurnStart(true);
          }}
        />
      )}
      {isWin && <NoticeEnd endType="win" />}
      {isLose && <NoticeEnd endType="lose" />}
    </div>
  );
};

export default GamePlay;
