import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import memberState from '@recoil/member.recoil';

const useSignOutMutation = () => {
  const navigate = useNavigate();
  const setMemberState = useSetRecoilState(memberState);

  const fetcher = () => axios.post(`/sign-out`);
  const signOut = () => {
    navigate('/');
    setMemberState(null);
  };

  return useMutation(fetcher, {
    onSuccess: () => {
      signOut();
    },
    onError: (error) => {
      const errorStatusCode = (error as AxiosError).response?.status;
      if (errorStatusCode === 401) {
        signOut();
      }
    },
  });
};

// eslint-disable-next-line import/prefer-default-export
export { useSignOutMutation };
