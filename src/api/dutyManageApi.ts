import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { ExecutiveInfo, JobList, MemberDetailInfo } from './dto';

const dutyManageKeys = {
  executiveInfo: ['executiveInfo'] as const,
  jobList: ['jobList'] as const,
  memberInfo: ['memberInfo'] as const,
};

type ExecutiveMember = Pick<MemberDetailInfo, 'memberId' | 'generation' | 'realName'>;

const useGetExecutiveInfoQuery = () => {
  const fetcher = () => axios.get(`/members/executives`).then(({ data }) => data);

  return useQuery<ExecutiveInfo[]>(dutyManageKeys.executiveInfo, fetcher);
};

const useGetJobListQuery = () => {
  const fetcher = () => axios.get(`/members/executive-jobs`).then(({ data }) => data);

  return useQuery<JobList[]>(dutyManageKeys.jobList, fetcher);
};

const useCreateExecutiveJobMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ memberId, jobId }: { memberId: number; jobId: number }) =>
    axios.post(`/members/${memberId}/executive-jobs/${jobId}`).then(({ data }) => data);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dutyManageKeys.executiveInfo });
    },
  });
};

const useDeleteExecutiveJobMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ memberId, jobId }: { memberId: number; jobId: number }) =>
    axios.delete(`/members/${memberId}/executive-jobs/${jobId}`).then(({ data }) => data);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dutyManageKeys.executiveInfo });
    },
  });
};

const useGetMemberInfoQuery = () => {
  const fetcher = () => axios.get(`members/real-name`).then(({ data }) => data);

  return useQuery<ExecutiveMember[]>(dutyManageKeys.memberInfo, fetcher);
};

export {
  useGetExecutiveInfoQuery,
  useGetJobListQuery,
  useCreateExecutiveJobMutation,
  useDeleteExecutiveJobMutation,
  useGetMemberInfoQuery,
};
