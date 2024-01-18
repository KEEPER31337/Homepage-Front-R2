import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { PointLog, PageAndSize } from './dto';

const pointKeys = {
  base: ['points'] as const,
  pointLog: (param: PageAndSize) => [...pointKeys.base, param] as const,
};

const useGetPointLogQuery = ({ page, size = 10 }: PageAndSize) => {
  const fetcher = () => axios.get('/points', { params: { page, size } }).then(({ data }) => data);

  return useQuery<PointLog>(pointKeys.pointLog({ page, size }), fetcher, {
    keepPreviousData: true,
  });
};

const useSendPointMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ point, memberId, message }: { point: number; memberId: number; message: string }) =>
    axios.post(`/points/present`, { point, memberId, message }).then(({ data }) => data);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pointKeys.pointLog({ page: 0 }) });
    },
  });
};

// eslint-disable-next-line import/prefer-default-export
export { useGetPointLogQuery, useSendPointMutation };
