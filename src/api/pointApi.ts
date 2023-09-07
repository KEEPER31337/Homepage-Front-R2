import { useQuery } from 'react-query';
import axios from 'axios';
import { PointLog, PageAndSize } from './dto';

const pointKeys = {
  pointLog: (param: PageAndSize) => ['pointLog', param] as const,
};

const useGetPointLogQuery = ({ page, size = 10 }: PageAndSize) => {
  const fetcher = () => axios.get('/points', { params: { page, size } }).then(({ data }) => data);

  return useQuery<PointLog>(pointKeys.pointLog({ page, size }), fetcher, {
    keepPreviousData: true,
  });
};

// eslint-disable-next-line import/prefer-default-export
export { useGetPointLogQuery };
