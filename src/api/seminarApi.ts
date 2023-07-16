import axios from 'axios';
import { useQuery } from 'react-query';
import { SeminarInfo } from './dto';

const seminarKeys = {
  getSeminar: ['getSeminar', 'id'] as const,
};

const useGetSeminarInfo = ({ id }: { id: number }) => {
  const fetcher = () => axios.get(`/seminars/${id}`).then(({ data }) => data);

  return useQuery<SeminarInfo>(seminarKeys.getSeminar, fetcher);
};

const useGetSeminarInfo2 = ({ id }: { id: number }) => {
  const fetcher = () => axios.get(`/seminars/${id}`).then(({ data }) => data);

  return useQuery<SeminarInfo>(seminarKeys.getSeminar, fetcher);
};

export { useGetSeminarInfo, useGetSeminarInfo2 };
