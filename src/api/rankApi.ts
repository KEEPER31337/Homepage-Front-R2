import axios from 'axios';
import { useQuery } from 'react-query';
import { AttendRankInfo, GameRankInfo, PageAndSize, PointRank, TodayAttendRank } from './dto';

const useGetTodayAttendanceRank = ({ page, size }: PageAndSize) => {
  const fetcher = () =>
    axios
      .get('/attendances/today-rank', {
        params: { page, size },
      })
      .then(({ data }) => data);

  return useQuery<TodayAttendRank>(['today-attendance-rank', page, size], fetcher, {
    keepPreviousData: true,
  });
};

const useGetContinuousAttendanceRank = () => {
  const fetcher = () => axios.get('/attendances/continuous-rank').then(({ data }) => data);

  return useQuery<AttendRankInfo[]>(['continuous-attendance-rank'], fetcher);
};

const useGetPointRank = ({ page, size }: PageAndSize) => {
  const fetcher = () => axios.get('/members/point-rank', { params: { page, size } }).then(({ data }) => data);

  return useQuery<PointRank>(['point-rank', page, size], fetcher, {
    keepPreviousData: true,
  });
};

const useGetGameRank = () => {
  const fetcher = () => axios.get('/game/rank').then(({ data }) => data);

  return useQuery<GameRankInfo[]>(['game-rank'], fetcher);
};

export { useGetTodayAttendanceRank, useGetContinuousAttendanceRank, useGetPointRank, useGetGameRank };
