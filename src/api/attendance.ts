import { useQuery } from 'react-query';
import axios from 'axios';
import { DateTime } from 'luxon';
import { CallenderChartInfo } from './dto';

const attendanceKeys = {
  attendanceInfoList: ({ memberId, year }: { memberId?: number; year: number }) => [
    'attendanceInfoList',
    memberId,
    year,
  ],
};

const useGetAttendanceInfoListQuery = ({ memberId, year }: { memberId?: number; year: number }) => {
  const fetcher = () =>
    axios
      .get(`/attendances/members/${memberId}/total`, {
        params: { localDate: DateTime.fromObject({ year }).startOf('year').toFormat('yyyy-MM-dd') },
      })
      .then(({ data }) => data);

  return useQuery<CallenderChartInfo[]>(attendanceKeys.attendanceInfoList({ memberId, year }), fetcher, {
    enabled: Boolean(memberId),
  });
};

// eslint-disable-next-line import/prefer-default-export
export { useGetAttendanceInfoListQuery };
