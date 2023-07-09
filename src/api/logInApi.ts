import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export, func-names, consistent-return
export const login = function ({ loginId, password }: { loginId: string; password: string }) {
  return axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, { loginId, password }, { withCredentials: true });
};

export const loginMutation = useMutation(login, {
  onError: (error, variable, context) => {
    alert('아이디 또는 비밀번호를 확인해주세요.');
  },
  onSuccess: () => {
    const navigate = useNavigate();
    navigate('/');
  },
});
