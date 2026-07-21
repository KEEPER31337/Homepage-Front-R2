import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { DateTime } from 'luxon';
import { SEMINAR } from '@constants/apiResponseMessage';
import { useApiError } from '@hooks/useGetApiError';
import { AttendSeminarListInfo, SeminarStatus, SeminarInfo, SeminarCardInfo } from './dto';

const seminarKeys = {
  getSeminarList: ['getSeminar', 'seminarList'] as const,
  getSeminar: ({ id }: { id: number }) => ['getSeminar', id] as const,
  getAvailableSeminar: ['getSeminar', 'available'] as const,
  getRecentlyDoneSeminar: ['getSeminar', 'recentlyDone'] as const,
  getRecentlyUpcomingSeminar: ['getSeminar', 'recentlyUpcoming'] as const,
  startSeminar: ['startSeminar'] as const,
  attendSeminarList: ({ page }: { page?: number }) => ['attendSeminarList', page] as const,
};

const useGetSeminarListQuery = () => {
  const fetcher = () =>
    axios.get(`/seminars`).then(({ data }) => {
      const transformedData = data.seminarList.map((seminarInfo: SeminarInfo) => {
        return { ...seminarInfo, name: seminarInfo.name.replaceAll('-', '.') };
      });
      return transformedData;
    });

  return useQuery<SeminarInfo[]>({ queryKey: seminarKeys.getSeminarList, queryFn: fetcher });
};

const useGetSeminarInfoQuery = (id: number) => {
  const fetcher = () =>
    axios.get(`/seminars/${id}`).then(({ data }) => {
      const transformedData = {
        ...data,
        name: data.name.replaceAll('-', '.'),
        openTime: data.openTime ? DateTime.fromISO(data.openTime) : null,
        attendanceStartTime: data.attendanceStartTime ? DateTime.fromISO(data.attendanceStartTime) : null,
        attendanceCloseTime: data.attendanceCloseTime ? DateTime.fromISO(data.attendanceCloseTime) : null,
        latenessCloseTime: data.latenessCloseTime ? DateTime.fromISO(data.latenessCloseTime) : null,
      };
      return transformedData;
    });

  return useQuery<SeminarCardInfo>({ queryKey: seminarKeys.getSeminar({ id }), queryFn: fetcher });
};

const useGetAvailableSeminarInfoQuery = () => {
  const fetcher = () => axios.get('/seminars/available').then(({ data }) => data);

  return useQuery<SeminarInfo>({ queryKey: seminarKeys.getAvailableSeminar, queryFn: fetcher });
};

const useGetRecentlyDoneSeminarInfoQuery = () => {
  const fetcher = () => axios.get(`/seminars/recently-done`).then(({ data }) => data);

  return useQuery<{ id: number }>({ queryKey: seminarKeys.getRecentlyDoneSeminar, queryFn: fetcher });
};

const useGetRecentlyUpcomingSeminarInfoQuery = () => {
  const fetcher = () => axios.get(`/seminars/recently-upcoming`).then(({ data }) => data);

  return useQuery<[{ id: number }, { id: number }]>({
    queryKey: seminarKeys.getRecentlyUpcomingSeminar,
    queryFn: fetcher,
  });
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

  return useMutation({
    mutationFn: fetcher,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: seminarKeys.getAvailableSeminar });
      queryClient.invalidateQueries({ queryKey: seminarKeys.getSeminar({ id }) });
      return response.data.attendanceCode;
    },
  });
};

const useAttendSeminarMutation = (id: number) => {
  const fetcher = (attendanceCode: string) => axios.patch(`/seminars/${id}/attendances`, { attendanceCode });

  return useMutation({
    mutationFn: fetcher,
    onSuccess: (response) => {
      return response.data;
    },
  });
};

const useEditAttendStatusMutation = ({ attendanceId, page }: { attendanceId: number; page?: number }) => {
  const queryClient = useQueryClient();

  const fetcher = ({ excuse, statusType }: { excuse: string; statusType: SeminarStatus }) =>
    axios.patch(`/seminars/attendances/${attendanceId}`, { excuse, statusType });
  return useMutation({
    mutationFn: fetcher,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: seminarKeys.attendSeminarList({ page }) });
      return response.data;
    },
  });
};

const useGetAttendSeminarListMutation = ({ page, size }: { page?: number; size?: number }) => {
  const fetcher = () => axios.get(`/seminars/attendances`, { params: { page, size } }).then(({ data }) => data);

  return useQuery<AttendSeminarListInfo>({
    queryKey: seminarKeys.attendSeminarList({ page }),
    queryFn: fetcher,
    select: (data) => {
      const transformedContent = data.content.map((membersSeminarAttendInfo) => {
        const seminarDateInfo = membersSeminarAttendInfo.attendances.reduce((prev, curr) => {
          const seminarDate = curr.attendDate.replaceAll('-', '.') || '';

          return {
            ...prev,
            [`date${seminarDate}`]: {
              ...curr,
              memberName: membersSeminarAttendInfo.memberName,
              memberId: membersSeminarAttendInfo.memberId,
            },
          };
        }, {});

        return {
          ...membersSeminarAttendInfo,
          totalCount: `${membersSeminarAttendInfo.totalAttendance} / ${membersSeminarAttendInfo.totalLateness} / ${membersSeminarAttendInfo.totalAbsence} / ${membersSeminarAttendInfo.totalPersonal}`,
          ...seminarDateInfo,
        };
      });

      return {
        ...data,
        content: transformedContent,
      };
    },
  });
};

const useAddSeminarMutation = ({ setHelperText }: { setHelperText: React.Dispatch<React.SetStateAction<string>> }) => {
  const queryClient = useQueryClient();

  const { handleError } = useApiError({
    409: {
      40901: () => {
        setHelperText(SEMINAR.error.duplicateSeminarDate);
      },
    },
  });

  const fetcher = (openDate: DateTime) =>
    axios
      .post(`/seminars`, null, {
        params: { openDate: openDate.toISODate() },
      })
      .then(({ data }) => data);
  return useMutation({
    mutationFn: fetcher,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: seminarKeys.getSeminarList });
      return response;
    },
    onError: (err) => handleError(err, 40901),
  });
};

const useDeleteSeminarMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = (id: number) => axios.delete(`/seminars/${id}`);
  return useMutation({
    mutationFn: fetcher,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: seminarKeys.getSeminarList });
      return response.data;
    },
  });
};

export {
  useGetSeminarListQuery,
  useGetRecentlyDoneSeminarInfoQuery,
  useGetRecentlyUpcomingSeminarInfoQuery,
  useGetSeminarInfoQuery,
  useGetAvailableSeminarInfoQuery,
  useStartSeminarMutation,
  useAttendSeminarMutation,
  useEditAttendStatusMutation,
  useGetAttendSeminarListMutation,
  useAddSeminarMutation,
  useDeleteSeminarMutation,
};
