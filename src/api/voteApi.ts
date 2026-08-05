import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  AdminVoteListItem,
  GetAdminVotesResponse,
  GetVotesResponse,
  VoteCreationRequest,
  VoteCreationResponse,
  VoteDetail,
  VoteListItem,
  VoteParticipationRequest,
  VoteParticipationResponse,
  VoteResultResponse,
} from './voteDto';

const voteKeys = {
  base: ['votes'] as const,
  listAll: () => [...voteKeys.base, 'list'] as const,
  list: (year: number) => [...voteKeys.base, 'list', year] as const,
  adminListAll: () => [...voteKeys.base, 'admin', 'list'] as const,
  adminList: (year: number) => [...voteKeys.base, 'admin', 'list', year] as const,
  detail: (voteId: number) => [...voteKeys.base, 'detail', voteId] as const,
  result: (voteId: number) => [...voteKeys.base, 'result', voteId] as const,
};

const getVotes = (year: number) =>
  axios.get<GetVotesResponse>('/votes', { params: { year } }).then(({ data }) => data.votes);

const getAdminVotes = (year: number) =>
  axios.get<GetAdminVotesResponse>('/admin/votes', { params: { year } }).then(({ data }) => data.votes);

const getVote = (voteId: number) => axios.get<VoteDetail>(`/votes/${voteId}`).then(({ data }) => data);

const getVoteResult = (voteId: number) =>
  axios.get<VoteResultResponse>(`/votes/${voteId}/result`).then(({ data }) => data);

const createVote = (request: VoteCreationRequest) =>
  axios.post<VoteCreationResponse>('/admin/votes', request).then(({ data }) => data);

const deleteVote = (voteId: number) => axios.delete(`/admin/votes/${voteId}`).then(() => undefined);

const participateVote = (voteId: number, request: VoteParticipationRequest) =>
  axios.post<VoteParticipationResponse>(`/votes/${voteId}/participation`, request).then(({ data }) => data);

const useGetVoteListQuery = (year: number) => {
  return useQuery<VoteListItem[]>({
    queryKey: voteKeys.list(year),
    queryFn: () => getVotes(year),
  });
};

const useGetAdminVoteListQuery = (year: number) => {
  return useQuery<AdminVoteListItem[]>({
    queryKey: voteKeys.adminList(year),
    queryFn: () => getAdminVotes(year),
  });
};

const useGetVoteQuery = ({ voteId, enabled = true }: { voteId: number; enabled?: boolean }) => {
  return useQuery<VoteDetail>({
    queryKey: voteKeys.detail(voteId),
    queryFn: () => getVote(voteId),
    enabled,
  });
};

const useGetVoteResultQuery = ({ voteId, enabled = true }: { voteId: number; enabled?: boolean }) => {
  return useQuery<VoteResultResponse>({
    queryKey: voteKeys.result(voteId),
    queryFn: () => getVoteResult(voteId),
    enabled,
  });
};

const useCreateVoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<VoteCreationResponse, Error, VoteCreationRequest>({
    mutationFn: createVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voteKeys.listAll() });
      queryClient.invalidateQueries({ queryKey: voteKeys.adminListAll() });
    },
  });
};

const useDeleteVoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voteKeys.listAll() });
      queryClient.invalidateQueries({ queryKey: voteKeys.adminListAll() });
    },
  });
};

const useParticipateVoteMutation = (voteId: number) => {
  const queryClient = useQueryClient();

  return useMutation<VoteParticipationResponse, Error, VoteParticipationRequest>({
    mutationFn: (request) => participateVote(voteId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voteKeys.listAll() });
    },
  });
};

export {
  useCreateVoteMutation,
  useDeleteVoteMutation,
  useGetAdminVoteListQuery,
  useGetVoteListQuery,
  useGetVoteQuery,
  useGetVoteResultQuery,
  useParticipateVoteMutation,
  voteKeys,
};
