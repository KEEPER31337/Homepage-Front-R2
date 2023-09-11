import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { gameKeys } from '@api/gameApi';
import { useApiError } from '@hooks/useGetApiError';
import { GameInfo, GameResultInfo, GameStatus } from './baseballDto';

export const baseballKeys = {
  game_info: ['game_info'] as const,
  status: ['status'] as const,
  result: ['result'] as const,
};

const useGetGameInfoQuery = () => {
  const fetcher = () => axios.get('/game/baseball/game-info').then(({ data }) => data);

  return useQuery<GameInfo>(baseballKeys.game_info, fetcher);
};

const useGetBaseBallStatusQuery = () => {
  const fetcher = () => axios.get('/game/baseball/status').then(({ data }) => data);

  return useQuery<{ status: GameStatus; baseballPerDay: number }>(baseballKeys.status, fetcher);
};

const useGameStartMutation = () => {
  const { handleError } = useApiError({
    400: {
      40001: () => {
        toast.error('포인트가 부족합니다.');
      },
    },
  });

  const fetcher = ({ bettingPoint }: { bettingPoint: number }) =>
    axios.post('/game/baseball/start', { bettingPoint }).then(({ data }) => data);

  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      const myGameInfo: { todayTotalEarnedPoint: number; currentMemberPoint: number } | undefined =
        queryClient.getQueryData(gameKeys.myInfo);

      if (myGameInfo) {
        queryClient.setQueryData(gameKeys.myInfo, {
          ...myGameInfo,
          currentMemberPoint: myGameInfo.currentMemberPoint - data.bettingPoint,
        });
      }
    },
    onError: (err) => handleError(err, 40001),
  });
};

const useGuessMutation = () => {
  const fetcher = ({ guessNumber }: { guessNumber: string }) =>
    axios.post('/game/baseball/guess', { guessNumber }).then(({ data }) => data);

  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: baseballKeys.result });
    },
  });
};

const useGetResultQuery = () => {
  const fetcher = () => axios.get('/game/baseball/result').then(({ data }) => data);
  return useQuery<GameResultInfo>(baseballKeys.result, fetcher);
};

export { useGetGameInfoQuery, useGetBaseBallStatusQuery, useGameStartMutation, useGuessMutation, useGetResultQuery };
