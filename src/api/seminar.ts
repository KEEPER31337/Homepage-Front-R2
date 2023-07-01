import axios from 'axios';
import { useQuery } from 'react-query';
import { SeminarInfo } from './dto';

const seminarKeys = {
  getSeminar: ['getSeminar', 'id'] as const,
};

const useGetSeminarInfo = ({ seminarId }: { seminarId: number }) => {
  const fetcher = () => axios.get(`/seminars/${seminarId}`).then(({ data }) => data);

  return useQuery<SeminarInfo>(seminarKeys.getSeminar, fetcher);
};

export default { useGetSeminarInfo };
