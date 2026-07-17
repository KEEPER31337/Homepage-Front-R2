import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import memberState from '@recoil/member.recoil';

const useSignOutMutation = () => {
  const navigate = useNavigate();
  const setMemberState = useSetAtom(memberState);

  const fetcher = () => axios.post(`/sign-out`);
  const signOut = () => {
    navigate('/');
    setMemberState(null);
  };

  return useMutation({
    mutationFn: fetcher,
    onSettled: () => {
      signOut();
    },
  });
};

// eslint-disable-next-line import/prefer-default-export
export { useSignOutMutation };
