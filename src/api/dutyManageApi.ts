import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ExecutiveInfo, JobList, memberInfo } from './dto';

const useGetExecutiveInfoQuery = () => {
  const fetcher = () => axios.get(`/members/executives`).then(({ data }) => data);

  return useQuery<ExecutiveInfo[]>(['executiveInfo'], fetcher);
};

const useGetJobListQuery = () => {
  const fetcher = () => axios.get(`/members/executive-jobs`).then(({ data }) => data);

  return useQuery<JobList[]>(['jobList'], fetcher);
};

const useCreateExecutiveJobMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ memberId, jobId }: { memberId: number; jobId: number }) =>
    axios.post(`/members/${memberId}/executive-jobs/${jobId}`).then(({ data }) => data);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['executiveInfo'] });
    },
  });
};

const useDeleteExecutiveJobMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ memberId, jobId }: { memberId: number; jobId: number }) =>
    axios.delete(`/members/${memberId}/executive-jobs/${jobId}`).then(({ data }) => data);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['executiveInfo'] });
    },
  });
};

const useGetMemberInfoQuery = () => {
  const fetcher = () => axios.get(`members/real-name`).then(({ data }) => data);

  return useQuery<memberInfo[]>(['jobList'], fetcher);
};

export {
  useGetExecutiveInfoQuery,
  useGetJobListQuery,
  useCreateExecutiveJobMutation,
  useDeleteExecutiveJobMutation,
  useGetMemberInfoQuery,
};
