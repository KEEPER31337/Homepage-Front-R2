import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { ProfileInfo } from './dto';

const profileKeys = {
  profileInfo: ['profile', 'profileInfo'] as const,
};

const useGetProfileQuery = (memberId: number) => {
  const fetcher = () => axios.get(`/members/${memberId}/profile`).then(({ data }) => data);

  return useQuery<ProfileInfo>(profileKeys.profileInfo, fetcher, { enabled: memberId !== 0 });
};

const useFollowMutation = (memberId: number) => {
  const fetcher = () => axios.post(`/members/${memberId}/follow`);

  return useMutation(fetcher);
};

const useUnFollowMutation = (memberId: number) => {
  const fetcher = () => axios.post(`/members/${memberId}/unfollow`);

  return useMutation(fetcher);
};

export { useGetProfileQuery, useFollowMutation, useUnFollowMutation };
