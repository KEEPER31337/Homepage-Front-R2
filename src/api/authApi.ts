import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import memberState from '@recoil/member.recoil';

const useSignOutMutation = () => {
  const fetcher = () => axios.post(`/sign-out`);

  const navigate = useNavigate();
  const setMemberState = useSetRecoilState(memberState);

  return useMutation(fetcher, {
    onSuccess: () => {
      navigate('/');
      setMemberState(null);
    },
  });
};

// eslint-disable-next-line import/prefer-default-export
export { useSignOutMutation };
