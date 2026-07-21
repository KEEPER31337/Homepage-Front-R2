import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const gameKeys = {
  myInfo: ['myInfo'] as const,
};

const useGetMyGameInfoQuery = () => {
  const fetcher = () => axios.get(`game/my-info`).then(({ data }) => data);

  return useQuery<{ todayTotalEarnedPoint: number; currentMemberPoint: number }>({
    queryKey: gameKeys.myInfo,
    queryFn: fetcher,
  });
};

// eslint-disable-next-line import/prefer-default-export
export { useGetMyGameInfoQuery };
