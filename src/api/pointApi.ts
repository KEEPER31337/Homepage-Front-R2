import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { PointLog, PageAndSize } from './dto';

const pointKeys = {
  base: ['points'] as const,
  pointLog: (param: PageAndSize) => [...pointKeys.base, param] as const,
};

const useGetPointLogQuery = ({ page, size = 10 }: PageAndSize) => {
  const params = { page, size };

  const fetcher = () => axios.get('/points', { params }).then(({ data }) => data);

  return useQuery<PointLog>({
    queryKey: pointKeys.pointLog(params),
    queryFn: fetcher,
    placeholderData: keepPreviousData,
  });
};

const useSendPointMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ point, memberId, message }: { point: number; memberId: number; message: string }) =>
    axios.post(`/points/present`, { point, memberId, message }).then(({ data }) => data);

  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pointKeys.pointLog({ page: 0 }) });
    },
  });
};

// eslint-disable-next-line import/prefer-default-export
export { useGetPointLogQuery, useSendPointMutation };
