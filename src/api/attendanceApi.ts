import { useQuery } from 'react-query';
import axios from 'axios';
import { DateTime } from 'luxon';
import {
  AttendRankInfo,
  CallenderChartInfo,
  PageAndSize,
  TodayAttendInfo,
  TodayAttendPoint,
  TodayAttendRank,
} from './dto';

const attendanceKeys = {
  base: ['attendances'] as const,
  todayAttendancePoint: ['todayAttendancePoint'],
  todayAttendanceInfo: ({ memberId }: { memberId: number }) => ['todayAttendanceInfo', memberId],
  attendanceInfoList: ({ memberId, year }: { memberId: number; year: number }) => [
    'attendanceInfoList',
    memberId,
    year,
  ],
  todayAttendanceRank: (param: PageAndSize) => [...attendanceKeys.base, 'today-rank', param] as const,
  continuousAttendanceRank: () => [...attendanceKeys.base, 'continuous-rank'] as const,
};

const useGetTodayAttendancePointQuery = () => {
  const fetcher = () => axios.get(`/attendances/point`).then(({ data }) => data);

  return useQuery<TodayAttendPoint>(attendanceKeys.todayAttendancePoint, fetcher);
};

const useGetTodayAttendanceInfoQuery = ({ memberId }: { memberId: number }) => {
  const fetcher = () => axios.get(`/attendances/members/${memberId}/info`).then(({ data }) => data);

  return useQuery<TodayAttendInfo>(attendanceKeys.todayAttendanceInfo({ memberId }), fetcher);
};

const useGetAttendanceInfoListQuery = ({ memberId, year }: { memberId: number; year: number }) => {
  const fetcher = () =>
    axios
      .get(`/attendances/members/${memberId}/total`, {
        params: { localDate: DateTime.fromObject({ year }).startOf('year').toFormat('yyyy-MM-dd') },
      })
      .then(({ data }) => data);

  return useQuery<CallenderChartInfo[]>(attendanceKeys.attendanceInfoList({ memberId, year }), fetcher);
};

const useGetTodayAttendanceRank = ({ page, size = 10 }: PageAndSize) => {
  const fetcher = () =>
    axios
      .get('/attendances/today-rank', {
        params: { page, size },
      })
      .then(({ data }) => data);

  return useQuery<TodayAttendRank>(attendanceKeys.todayAttendanceRank({ page, size }), fetcher, {
    keepPreviousData: true,
  });
};

const useGetContinuousAttendanceRank = () => {
  const fetcher = () => axios.get('/attendances/continuous-rank').then(({ data }) => data);

  return useQuery<AttendRankInfo[]>(attendanceKeys.continuousAttendanceRank(), fetcher);
};

export {
  useGetTodayAttendancePointQuery,
  useGetTodayAttendanceInfoQuery,
  useGetAttendanceInfoListQuery,
  useGetTodayAttendanceRank,
  useGetContinuousAttendanceRank,
};
