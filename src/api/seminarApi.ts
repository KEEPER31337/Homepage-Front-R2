import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { DateTime } from 'luxon';
import { ActivityStatus, AvailableSeminarInfo, SeminarInfo } from './dto';

const seminarKeys = {
  getSeminar: ['getSeminar', 'id'] as const,
  getAvailableSeminar: ['getSeminar', 'available'] as const,
  getRecentlyDoneSeminar: ['getSeminar', 'recentlyDone'] as const,
  getRecentlyUpcomingSeminar: ['getSeminar', 'recentlyUpcoming'] as const,
  startSeminar: ['startSeminar'] as const,
};

const useGetSeminarInfoQuery = (id: number) => {
  const fetcher = () =>
    axios.get(`/seminars/${id}`).then(({ data }) => {
      const transformedData = {
        ...data,
        seminarName: data.seminarName.replaceAll('-', '.'),
        openTime: DateTime.fromISO(data.openTime),
        attendanceCloseTime: DateTime.fromISO(data.attendanceCloseTime),
        latenessCloseTime: DateTime.fromISO(data.latenessCloseTime),
      };
      return transformedData;
    });

  return useQuery<SeminarInfo>(seminarKeys.getSeminar, fetcher);
};

const useGetAvailableSeminarInfoQuery = () => {
  const fetcher = () => axios.get('/seminars/available').then(({ data }) => data);

  return useQuery<AvailableSeminarInfo>(seminarKeys.getAvailableSeminar, fetcher);
};

const useGetRecentlyDoneSeminarInfoQuery = () => {
  const fetcher = () => axios.get(`/seminars/recently-done`).then(({ data }) => data.id);

  return useQuery<number>(seminarKeys.getRecentlyDoneSeminar, fetcher);
};

const useGetRecentlyUpcomingSeminarInfoQuery = () => {
  const fetcher = () => axios.get(`/seminars/recently-upcoming`).then(({ data }) => data);

  return useQuery<[{ id: number }, { id: number }]>(seminarKeys.getRecentlyUpcomingSeminar, fetcher);
};

const useStartSeminarMutation = (id: number) => {
  const queryClient = useQueryClient();
  const fetcher = ({
    attendanceCloseTime,
    latenessCloseTime,
  }: {
    attendanceCloseTime: string;
    latenessCloseTime: string;
  }) => axios.post(`/seminars/${id}`, { attendanceCloseTime, latenessCloseTime });

  return useMutation(fetcher, {
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: seminarKeys.getAvailableSeminar });
      return response.data.attendanceCode;
    },
  });
};

const useAttendSeminarMutation = (id: number) => {
  const fetcher = (attendanceCode: string) => axios.patch(`/seminars/${id}/attendances`, { attendanceCode });

  return useMutation(fetcher, {
    onSuccess: (response) => {
      return response.data;
    },
  });
};

const useEditAttendStatusMutation = (seminarId: number, memberId: number) => {
  const fetcher = ({ excuse, statusType }: { excuse: string; statusType: ActivityStatus }) =>
    axios.patch(`/seminars/${seminarId}/attendances/${memberId}`, { excuse, statusType });
  return useMutation(fetcher, {
    onSuccess: (response) => {
      return response.data;
    },
  });
};

export {
  useGetRecentlyDoneSeminarInfoQuery,
  useGetRecentlyUpcomingSeminarInfoQuery,
  useGetSeminarInfoQuery,
  useGetAvailableSeminarInfoQuery,
  useStartSeminarMutation,
  useAttendSeminarMutation,
  useEditAttendStatusMutation,
};
