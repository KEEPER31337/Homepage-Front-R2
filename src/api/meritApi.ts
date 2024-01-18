import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { PageAndSize, MeritLog, MeritType, MembersMerit } from './dto';

const meritKeys = {
  base: ['merits'] as const,
  meritLog: (params: PageAndSize & { meritType?: string }) => [...meritKeys.base, params] as const,
  meritType: (params: PageAndSize) => [...meritKeys.base, 'types', params] as const,
  membersMerit: (params: PageAndSize) => [...meritKeys.base, 'members', params] as const,
  memberMerit: (memberId: number, params: PageAndSize) => [...meritKeys.base, 'members', memberId, params] as const,
};

const useGetMeritLogQuery = ({ page, size = 10, meritType = 'ALL' }: PageAndSize & { meritType?: string }) => {
  const fetcher = () =>
    axios
      .get('/merits', {
        params: { page, size, meritType },
      })
      .then(({ data }) => data);

  return useQuery<MeritLog>(meritKeys.meritLog({ page, size, meritType }), fetcher, {
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

const useGetMembersMeritQuery = ({ page, size = 10 }: PageAndSize) => {
  const fetcher = () =>
    axios
      .get('/merits/members', {
        params: { page, size },
      })
      .then(({ data }) => data);

  return useQuery<MembersMerit>(meritKeys.membersMerit({ page, size }), fetcher, {
    keepPreviousData: true,
  });
};

const useGetMemberMeritQuery = ({ page, size = 10, memberId }: PageAndSize & { memberId: number }) => {
  const fetcher = () =>
    axios
      .get(`/merits/members/${memberId}`, {
        params: { page, size },
      })
      .then(({ data }) => data);

  return useQuery<MeritLog>(meritKeys.memberMerit(memberId, { page, size }), fetcher, {
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

  const fetcher = ({ score, reason, isMerit }: { score: number; reason: string; isMerit: boolean }) =>
    axios.post(`/merits/types`, { score, reason, isMerit }).then(({ data }) => data);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meritKeys.meritType({ page: 0 }) });
    },
  });
};

const useEditMeritTypeMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({
    score,
    reason,
    meritTypeId,
    isMerit,
  }: {
    score: number;
    reason: string;
    meritTypeId: number;
    isMerit: boolean;
  }) => axios.put(`/merits/types/${meritTypeId}`, { score, reason, isMerit }).then(({ data }) => data);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meritKeys.meritType({ page: 0 }) });
    },
  });
};

const useDeleteMeritLogMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ meritLogId }: { meritLogId: number }) =>
    axios.delete(`/merits/${meritLogId}`).then(({ data }) => data);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meritKeys.meritLog({ page: 0 }) });
      queryClient.invalidateQueries({ queryKey: meritKeys.membersMerit({ page: 0 }) });
    },
  });
};

export {
  useGetMeritLogQuery,
  useGetMeritTypeQuery,
  useGetMembersMeritQuery,
  useGetMemberMeritQuery,
  useAddMeritLogMutation,
  useAddMeritTypeMutation,
  useEditMeritTypeMutation,
  useDeleteMeritLogMutation,
};
