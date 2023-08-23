import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { ActivityStatus, AvailableSeminarInfo, SeminarInfo } from './dto';

const seminarKeys = {
  getSeminar: ['getSeminar', 'id'] as const,
  getAvailableSeminar: ['getSeminar', 'available'] as const,
  startSeminar: ['startSeminar'] as const,
};

const useGetSeminarInfoQuery = (id: number) => {
  const fetcher = () => axios.get(`/seminars/${id}`).then(({ data }) => data);

  return useQuery<SeminarInfo>(seminarKeys.getSeminar, fetcher);
};

const useGetAvailableSeminarInfoQuery = () => {
  const fetcher = () => axios.get('/seminars/available').then(({ data }) => data);

  return useQuery<AvailableSeminarInfo>(seminarKeys.getAvailableSeminar, fetcher);
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
  useGetSeminarInfoQuery,
  useGetAvailableSeminarInfoQuery,
  useStartSeminarMutation,
  useAttendSeminarMutation,
  useEditAttendStatusMutation,
};
