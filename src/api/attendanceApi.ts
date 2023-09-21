import { useQuery } from 'react-query';
import axios from 'axios';
import { DateTime } from 'luxon';
import { CallenderChartInfo, TodayAttendInfo, TodayAttendPoint } from './dto';

const attendanceKeys = {
  todayAttendancePoint: ['todayAttendancePoint'],
  todayAttendanceInfo: ({ memberId }: { memberId: number }) => ['todayAttendanceInfo', memberId],
  attendanceInfoList: ({ memberId, year }: { memberId: number; year: number }) => [
    'attendanceInfoList',
    memberId,
    year,
  ],
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

export { useGetTodayAttendancePointQuery, useGetTodayAttendanceInfoQuery, useGetAttendanceInfoListQuery };
