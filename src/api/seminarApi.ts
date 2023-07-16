import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { SeminarInfo } from './dto';

const seminarKeys = {
  getSeminar: ['getSeminar', 'id'] as const,
  startSeminar: ['startSeminar'] as const,
};

const useGetSeminarInfo = ({ id }: { id: number }) => {
  const fetcher = () => axios.get(`/seminars/${id}`).then(({ data }) => data);

  return useQuery<SeminarInfo>(seminarKeys.getSeminar, fetcher);
};

const startSeminar = ({ id }: { id: number }) => {
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

export { useGetSeminarInfo, startSeminar };
