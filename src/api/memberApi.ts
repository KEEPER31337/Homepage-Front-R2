import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { formatGeneration } from '@utils/converter';
import { ProfileInfo } from './dto';

const profileKeys = {
  profileInfo: (memberId: number) => ['profile', 'profileInfo', memberId] as const,
};

const useGetProfileQuery = (memberId: number) => {
  const fetcher = () =>
    axios.get(`/members/${memberId}/profile`).then(({ data }: { data: ProfileInfo }) => {
      return {
        ...data,
        generation: formatGeneration(data.generation),
        follower: data.follower.map((followerInfo) => {
          return {
            ...followerInfo,
            generation: formatGeneration(followerInfo.generation),
          };
        }),
        followee: data.followee.map((followeeInfo) => {
          return {
            ...followeeInfo,
            generation: formatGeneration(followeeInfo.generation),
          };
        }),
      };
    });

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

const useEditProfileMutation = () => {
  const fetcher = ({ realName, birthday, studentId }: Pick<ProfileInfo, 'realName' | 'birthday' | 'studentId'>) =>
    axios.patch(`/members/profile`, { realName, birthday, studentId });

  return useMutation(fetcher);
};

const useEditProfileThumbnailMutation = () => {
  const fetcher = ({ thumbnail }: { thumbnail: Blob }) => {
    const formData = new FormData();
    formData.append('thumbnail', thumbnail);

    return axios.patch(`/members/thumbnail`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  return useMutation(fetcher);
};

export {
  useGetProfileQuery,
  useFollowMemberMutation,
  useUnFollowMemberMutation,
  useEditProfileMutation,
  useEditProfileThumbnailMutation,
};
