import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { PASSWORD } from '@constants/apiResponseMessage';
import { useApiError } from '@hooks/useGetApiError';
import { formatGeneration } from '@utils/converter';
import { ProfileInfo, MemberDetailInfo } from './dto';

const memberKeys = {
  memberList: ['member', 'memberList'] as const,
};
const profileKeys = {
  profileInfo: (memberId: number) => ['profile', 'profileInfo', memberId] as const,
};

const useGetMembersQuery = ({
  searchName,
  onSuccess,
}: {
  searchName?: string;
  onSuccess?: (data: MemberDetailInfo[]) => void;
}) => {
  const fetcher = () =>
    axios.get('/members/real-name', { params: { searchName } }).then(({ data }) => {
      return data.map((memberInfo: MemberDetailInfo) => {
        return {
          ...memberInfo,
          generation: formatGeneration(memberInfo.generation),
        };
      });
    });
  return useQuery<MemberDetailInfo[]>(memberKeys.memberList, fetcher, {
    onSuccess,
  });
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

const useEditProfileMutation = (memberId: number) => {
  const queryClient = useQueryClient();

  const fetcher = ({ realName, birthday }: Pick<ProfileInfo, 'realName' | 'birthday'>) =>
    axios.patch(`/members/profile`, { realName, birthday });

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.profileInfo(memberId) });
    },
  });
};

const useEditProfileThumbnailMutation = (memberId: number) => {
  const queryClient = useQueryClient();

  const fetcher = ({ thumbnail }: { thumbnail: Blob | null }) => {
    const formData = new FormData();
    if (thumbnail) formData.append('thumbnail', thumbnail);

    return axios.patch(`/members/thumbnail`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.profileInfo(memberId) });
    },
  });
};

const useNewEmailAuthMutation = () => {
  const fetcher = (email: string) => axios.post('/members/email-auth', { email }).then(({ data }) => data);

  return useMutation(fetcher);
};

const useEditEmailMutation = () => {
  const { handleError } = useApiError({
    400: {
      default: () => {
        toast.error(PASSWORD.error.mismatch);
      },
    },
  });

  const fetcher = ({ email, auth, password }: { email: string; auth: string; password: string }) =>
    axios.patch('/members/email', { email, auth, password }).then(({ data }) => data);

  return useMutation(fetcher, { onError: (err) => handleError(err, 400) });
};

const useEditPasswordMutation = () => {
  const { handleError } = useApiError({
    400: {
      default: () => {
        toast.error(PASSWORD.error.mismatch);
      },
    },
  });
  const fetcher = ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) =>
    axios.patch('/members/change-password', { oldPassword, newPassword }).then(({ data }) => data);

  return useMutation(fetcher, {
    onSuccess: () => {
      toast.success(PASSWORD.success.changed);
    },
    onError: (err) => handleError(err, 400),
  });
};

const useWithdrawalMutation = () => {
  const { handleError } = useApiError({
    400: {
      default: () => {
        toast.error(PASSWORD.error.mismatch);
      },
    },
  });
  const fetcher = ({ rawPassword }: { rawPassword: string }) =>
    axios.delete('/members', { data: { rawPassword } }).then(({ data }) => data);

  return useMutation(fetcher, { onError: (err) => handleError(err, 400) });
};

const useEditMemberTypeMutation = () => {
  const queryClient = useQueryClient();
  const fetcher = ({ typeId, memberIds }: { typeId: number; memberIds: number[] }) =>
    axios.patch(`/members/types/${typeId}`, { memberIds });

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.memberList });
    },
  });
};

const useDeleteMemberMutation = () => {
  const queryClient = useQueryClient();
  const fetcher = ({ memberIds }: { memberIds: number[] }) => axios.delete(`/members/admin`, { data: { memberIds } });

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.memberList });
    },
  });
};

export {
  useGetMembersQuery,
  useGetProfileQuery,
  useFollowMemberMutation,
  useUnFollowMemberMutation,
  useEditProfileMutation,
  useEditProfileThumbnailMutation,
  useNewEmailAuthMutation,
  useEditEmailMutation,
  useEditPasswordMutation,
  useWithdrawalMutation,
  useEditMemberTypeMutation,
  useDeleteMemberMutation,
};
