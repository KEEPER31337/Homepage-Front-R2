import axios from 'axios';
import { useQuery } from 'react-query';

export const gameKeys = {
  myInfo: ['myInfo'] as const,
};

const useGetMyGameInfoQuery = () => {
  const fetcher = () => axios.get(`game/my-info`).then(({ data }) => data);

  return useQuery<{ todayTotalEarnedPoint: number; currentMemberPoint: number }>(gameKeys.myInfo, fetcher);
};

// eslint-disable-next-line import/prefer-default-export
export { useGetMyGameInfoQuery };
