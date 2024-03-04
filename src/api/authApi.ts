import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    onSettled: () => {
      signOut();
    },
  });
};

// eslint-disable-next-line import/prefer-default-export
export { useSignOutMutation };
