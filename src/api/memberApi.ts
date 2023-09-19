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

const useNewEmailAuthMutation = () => {
  const fetcher = (email: string) => axios.post('/members/email-auth', { email }).then(({ data }) => data);

  return useMutation(fetcher);
};

const useEditEmailMutation = () => {
  const fetcher = ({ email, auth, password }: { email: string; auth: string; password: string }) =>
    axios.patch('/members/email', { email, auth, password }).then(({ data }) => data);

  return useMutation(fetcher);
};

export {
  useGetProfileQuery,
  useFollowMutation,
  useUnFollowMutation,
  useEditProfileMutation,
  useEditProfileThumbnailMutation,
  useNewEmailAuthMutation,
  useEditEmailMutation,
};
