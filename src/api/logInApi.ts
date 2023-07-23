import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const useLoginMutation = () => {
  const fetcher = ({ loginId, password }: { loginId: string; password: string }) =>
    axios.post(`/sign-in`, { loginId, password });

  const navigate = useNavigate();

  return useMutation(fetcher, {
    onError: () => {
      alert('아이디 또는 비밀번호를 확인해주세요.');
    },
    onSuccess: () => {
      navigate('/');
    },
  });
};

export default useLoginMutation;
