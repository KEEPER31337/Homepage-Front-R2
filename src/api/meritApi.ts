import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { PageAndSize, MeritLog, MeritType, MembersMerit } from './dto';

const meritKeys = {
  meritLog: (param: PageAndSize & { meritType?: string }) => ['meritLog', param] as const,
  meritType: (param: PageAndSize) => ['meritType', param] as const,
  membersMerit: (param: PageAndSize) => ['membersMerit', param] as const,
  memberMerit: (param: PageAndSize & { memberId: number }) => ['memberMerit', param] as const,
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

  return useQuery<MeritLog>(meritKeys.memberMerit({ page, size, memberId }), fetcher, {
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
