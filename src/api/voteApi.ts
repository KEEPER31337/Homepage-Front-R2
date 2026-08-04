import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAdminVotesMock, getVoteMock, getVotesMock, participateVoteMock } from '@mocks/voteApiMock';
import { AdminVoteListItem, VoteDetail, VoteListItem, VoteParticipationRequest } from './voteDto';

const voteKeys = {
  base: ['votes'] as const,
  listAll: () => [...voteKeys.base, 'list'] as const,
  list: (year: number) => [...voteKeys.base, 'list', year] as const,
  adminList: (year: number) => [...voteKeys.base, 'admin', 'list', year] as const,
  detail: (voteId: number) => [...voteKeys.base, 'detail', voteId] as const,
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

export { useGetAdminVoteListQuery, useGetVoteListQuery, useGetVoteQuery, useParticipateVoteMutation, voteKeys };
