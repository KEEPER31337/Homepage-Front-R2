import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createVoteMock,
  deleteVoteMock,
  getAdminVotesMock,
  getVoteMock,
  getVoteResultMock,
  getVotesMock,
  participateVoteMock,
} from '@mocks/voteApiMock';
import {
  AdminVoteListItem,
  VoteCreationRequest,
  VoteCreationResponse,
  VoteDetail,
  VoteListItem,
  VoteParticipationRequest,
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

const useGetVoteListQuery = (year: number) => {
  const fetcher = () => getVotesMock(year).then(({ votes }) => votes);

  return useQuery<VoteListItem[]>({
    queryKey: voteKeys.list(year),
    queryFn: fetcher,
  });
};

const useGetAdminVoteListQuery = (year: number) => {
  const fetcher = () => getAdminVotesMock(year).then(({ votes }) => votes);

  return useQuery<AdminVoteListItem[]>({
    queryKey: voteKeys.adminList(year),
    queryFn: fetcher,
  });
};

const useGetVoteQuery = ({ voteId, enabled = true }: { voteId: number; enabled?: boolean }) => {
  const fetcher = () => getVoteMock(voteId);

  return useQuery<VoteDetail>({
    queryKey: voteKeys.detail(voteId),
    queryFn: fetcher,
    enabled,
  });
};

const useGetVoteResultQuery = ({ voteId, enabled = true }: { voteId: number; enabled?: boolean }) => {
  const fetcher = () => getVoteResultMock(voteId);

  return useQuery<VoteResultResponse>({
    queryKey: voteKeys.result(voteId),
    queryFn: fetcher,
    enabled,
  });
};

const useCreateVoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<VoteCreationResponse, Error, VoteCreationRequest>({
    mutationFn: createVoteMock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voteKeys.listAll() });
      queryClient.invalidateQueries({ queryKey: voteKeys.adminListAll() });
    },
  });
};

const useDeleteVoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteVoteMock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voteKeys.listAll() });
      queryClient.invalidateQueries({ queryKey: voteKeys.adminListAll() });
    },
  });
};

const useParticipateVoteMutation = (voteId: number) => {
  const queryClient = useQueryClient();
  const fetcher = (request: VoteParticipationRequest) => participateVoteMock(voteId, request);

  return useMutation({
    mutationFn: fetcher,
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
