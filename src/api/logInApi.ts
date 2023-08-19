import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const useLoginMutation = () => {
  const fetcher = ({ loginId, password }: { loginId: string; password: string }) =>
    axios.post(`/sign-in`, { loginId, password });

  const navigate = useNavigate();

  return useMutation(fetcher, {
    onSuccess: () => {
      navigate('/');
    },
  });
};

export default useLoginMutation;
