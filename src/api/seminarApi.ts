import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useApiError } from '@hooks/useGetApiError';
import { AttendSeminarListInfo, SeminarStatus, SeminarInfo } from './dto';

const seminarKeys = {
  getSeminarList: ['getSeminar', 'seminarList'] as const,
  getSeminar: ['getSeminar', 'id'] as const,
  getAvailableSeminar: ['getSeminar', 'available'] as const,
  getRecentlyDoneSeminar: ['getSeminar', 'recentlyDone'] as const,
  getRecentlyUpcomingSeminar: ['getSeminar', 'recentlyUpcoming'] as const,
  startSeminar: ['startSeminar'] as const,
  attendSeminarList: ['attendSeminarList'] as const,
};

const useGetSeminarListQuery = () => {
  const fetcher = () =>
    axios.get(`/seminars`).then(({ data }) => {
      const transformedData = data.seminarList.map((seminarInfo: SeminarInfo) => {
        return { ...seminarInfo, name: seminarInfo.name.replaceAll('-', '.') };
      });
      return transformedData;
    });

  return useQuery<SeminarInfo[]>(seminarKeys.getSeminarList, fetcher);
};

const useGetSeminarInfoQuery = (id: number) => {
  const fetcher = () =>
    axios.get(`/seminars/${id}`).then(({ data }) => {
      const transformedData = {
        ...data,
        name: data.name.replaceAll('-', '.'),
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

  return useQuery<SeminarInfo>(seminarKeys.getAvailableSeminar, fetcher);
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

const useEditAttendStatusMutation = (attendanceId: number) => {
  const queryClient = useQueryClient();

  const fetcher = ({ excuse, statusType }: { excuse: string; statusType: SeminarStatus }) =>
    axios.patch(`/seminars/attendances/${attendanceId}`, { excuse, statusType });
  return useMutation(fetcher, {
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: seminarKeys.attendSeminarList });
      return response.data;
    },
  });
};

const useGetAttendSeminarListMutation = ({ page, size }: { page?: number; size?: number }) => {
  const fetcher = () => axios.get(`/seminars/attendances`, { params: { page, size } }).then(({ data }) => data);

  return useQuery<AttendSeminarListInfo>(seminarKeys.attendSeminarList, fetcher, {
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

const useAddSeminarMutation = () => {
  const queryClient = useQueryClient();

  const { handleError } = useApiError({
    409: {
      40901: () => {
        toast.error('동일한 날짜의 세미나는 생성할 수 없다.');
      },
    },
  });

  const fetcher = (openDate: DateTime) =>
    axios
      .post(`/seminars`, null, {
        params: { openDate: openDate.toISODate() },
      })
      .then(({ data }) => data);
  return useMutation(fetcher, {
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
  return useMutation(fetcher, {
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
