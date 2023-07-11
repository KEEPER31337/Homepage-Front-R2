import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const login = ({ loginId, password }: { loginId: string; password: string }) => {
  return axios.post(`/sign-in`, { loginId, password }, { withCredentials: true });
};

export const loginMutation = useMutation(login, {
  onError: () => {
    alert('아이디 또는 비밀번호를 확인해주세요.');
  },
  onSuccess: () => {
    const navigate = useNavigate();
    navigate('/');
  },
});
