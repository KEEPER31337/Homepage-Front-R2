import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { SeminarInfo } from './dto';

const seminarKeys = {
  getSeminar: ['getSeminar', 'id'] as const,
  getAvailableSeminar: ['getSeminar', 'available'] as const,
  startSeminar: ['startSeminar'] as const,
};

const useGetSeminarInfo = ({ id }: { id: number }) => {
  const fetcher = () => axios.get(`/seminars/${id}`).then(({ data }) => data);

  return useQuery<SeminarInfo>(seminarKeys.getSeminar, fetcher);
};

const getAvailableSeminarInfo = () => {
  const fetcher = () => axios.get('/seminars/available').then(({ data }) => data);

  return useQuery<SeminarInfo>(seminarKeys.getAvailableSeminar, fetcher);
};

const startSeminar = (id: number) => {
  const fetcher = ({
    attendanceCloseTime,
    latenessCloseTime,
  }: {
    attendanceCloseTime: string;
    latenessCloseTime: string;
  }) => axios.post(`/seminars/${id}`, { attendanceCloseTime, latenessCloseTime });

  return useMutation(fetcher, {
    onSuccess: (response) => {
      return response.data.attendanceCode;
    },
  });
};

const attendSeminar = (id: number) => {
  const fetcher = (attendanceCode: string) => axios.post(`{/seminars/${id}/attendances}`, { attendanceCode });

  return useMutation(fetcher, {
    onSuccess: (response) => {
      return response.data;
    },
  });
};

export { useGetSeminarInfo, getAvailableSeminarInfo, startSeminar, attendSeminar };
