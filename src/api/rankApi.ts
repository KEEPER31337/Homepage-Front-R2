import { useQuery } from 'react-query';
import axios from 'axios';
import { AttendRankInfo, GameRankInfo, PageAndSize, PointRank, TodayAttendRank } from './dto';

const rankKeys = {
  todayAttendanceRank: (param: PageAndSize) => ['today-attendance-rank', param] as const,
  continuousAttendanceRank: ['continuous-attendance-rank'] as const,
  pointRank: (param: PageAndSize) => ['point-rank', param] as const,
  gameRank: ['game-rank'] as const,
};

const useGetTodayAttendanceRank = ({ page, size = 10 }: PageAndSize) => {
  const fetcher = () =>
    axios
      .get('/attendances/today-rank', {
        params: { page, size },
      })
      .then(({ data }) => data);

  return useQuery<TodayAttendRank>(rankKeys.todayAttendanceRank({ page, size }), fetcher, {
    keepPreviousData: true,
  });
};

const useGetContinuousAttendanceRank = () => {
  const fetcher = () => axios.get('/attendances/continuous-rank').then(({ data }) => data);

  return useQuery<AttendRankInfo[]>(rankKeys.continuousAttendanceRank, fetcher);
};

const useGetPointRank = ({ page, size = 10 }: PageAndSize) => {
  const fetcher = () => axios.get('/members/point-rank', { params: { page, size } }).then(({ data }) => data);

  return useQuery<PointRank>(rankKeys.pointRank({ page, size }), fetcher, {
    keepPreviousData: true,
  });
};

const useGetGameRank = () => {
  const fetcher = () => axios.get('/game/rank').then(({ data }) => data);

  return useQuery<GameRankInfo[]>(rankKeys.gameRank, fetcher);
};

export { useGetTodayAttendanceRank, useGetContinuousAttendanceRank, useGetPointRank, useGetGameRank };
