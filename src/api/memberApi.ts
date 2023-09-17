import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { ProfileInfo } from './dto';

const profileKeys = {
  profileInfo: (memberId: number) => ['profile', 'profileInfo', memberId] as const,
};

const useGetProfileQuery = (memberId: number) => {
  const fetcher = () => axios.get(`/members/${memberId}/profile`).then(({ data }) => data);

  return useQuery<ProfileInfo>(profileKeys.profileInfo(memberId), fetcher, { enabled: memberId !== 0 });
};

const useFollowMemberMutation = (memberId: number) => {
  const queryClient = useQueryClient();
  const fetcher = () => axios.post(`/members/${memberId}/follow`);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.profileInfo(memberId) });
    },
  });
};

const useUnFollowMemberMutation = (memberId: number) => {
  const queryClient = useQueryClient();
  const fetcher = () => axios.delete(`/members/${memberId}/unfollow`);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.profileInfo(memberId) });
    },
  });
};

export { useGetProfileQuery, useFollowMemberMutation, useUnFollowMemberMutation };
