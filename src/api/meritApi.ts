import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { PageAndSize, MeritLog, MeritType } from './dto';

const meritKeys = {
  meritLog: (param: PageAndSize) => ['merit-log', param] as const,
  meritType: (param: PageAndSize) => ['merit-type', param] as const,
};

const useGetMeritLogQuery = ({ page, size = 10 }: PageAndSize) => {
  const fetcher = () =>
    axios
      .get('/merits', {
        params: { page, size },
      })
      .then(({ data }) => data);

  return useQuery<MeritLog>(meritKeys.meritLog({ page, size }), fetcher, {
    keepPreviousData: true,
  });
};

const useGetMeritTypeQuery = ({ page, size = 10 }: PageAndSize) => {
  const fetcher = () =>
    axios
      .get('/merits/types', {
        params: { page, size },
      })
      .then(({ data }) => data);

  return useQuery<MeritType>(meritKeys.meritType({ page, size }), fetcher, {
    keepPreviousData: true,
  });
};

const useAddMeritLogMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ awarderId, meritTypeId }: { awarderId: number; meritTypeId: number }) =>
    axios.post(`/merits`, { awarderId, meritTypeId }).then(({ data }) => data);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meritKeys.meritLog({ page: 0 }) });
    },
  });
};

const useAddMeritTypeMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ score, reason }: { score: number; reason: string }) =>
    axios.post(`/merits/types`, { score, reason }).then(({ data }) => data);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meritKeys.meritType({ page: 0 }) });
    },
  });
};

const useEditMeritTypeMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ score, reason, meritTypeId }: { score: number; reason: string; meritTypeId: number }) =>
    axios.put(`/merits/types/${meritTypeId}`, { score, reason }).then(({ data }) => data);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meritKeys.meritType({ page: 0 }) });
    },
  });
};

export {
  useGetMeritLogQuery,
  useGetMeritTypeQuery,
  useAddMeritLogMutation,
  useAddMeritTypeMutation,
  useEditMeritTypeMutation,
};
