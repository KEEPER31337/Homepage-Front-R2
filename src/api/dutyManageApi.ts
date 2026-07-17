import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { formatMemberGeneration } from '@utils/converter';
import { ExecutiveInfo, JobList, MemberDetailInfo } from './dto';

const dutyManageKeys = {
  executiveInfo: ['executiveInfo'] as const,
  jobList: ['jobList'] as const,
  memberInfo: ['memberInfo'] as const,
};

type ExecutiveMember = Pick<MemberDetailInfo, 'memberId' | 'generation' | 'realName'>;

const useGetExecutiveInfoQuery = () => {
  const fetcher = () => axios.get(`/members/executives`).then(({ data }) => data);

  return useQuery<ExecutiveInfo[]>({ queryKey: dutyManageKeys.executiveInfo, queryFn: fetcher });
};

const useGetJobListQuery = () => {
  const fetcher = () => axios.get(`/members/executive-jobs`).then(({ data }) => data);

  return useQuery<JobList[]>({ queryKey: dutyManageKeys.jobList, queryFn: fetcher });
};

const useCreateExecutiveJobMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ memberId, jobId }: { memberId: number; jobId: number }) =>
    axios.post(`/members/${memberId}/executive-jobs/${jobId}`).then(({ data }) => data);

  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dutyManageKeys.executiveInfo });
    },
  });
};

const useDeleteExecutiveJobMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ memberId, jobId }: { memberId: number; jobId: number }) =>
    axios.delete(`/members/${memberId}/executive-jobs/${jobId}`).then(({ data }) => data);

  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dutyManageKeys.executiveInfo });
    },
  });
};

const useGetMemberInfoQuery = () => {
  const fetcher = () => axios.get(`members/real-name`).then(({ data }) => data);

  return useQuery<ExecutiveMember[]>({
    queryKey: dutyManageKeys.memberInfo,
    queryFn: fetcher,
    select: (data) => data.map(formatMemberGeneration),
  });
};

export {
  useGetExecutiveInfoQuery,
  useGetJobListQuery,
  useCreateExecutiveJobMutation,
  useDeleteExecutiveJobMutation,
  useGetMemberInfoQuery,
};
