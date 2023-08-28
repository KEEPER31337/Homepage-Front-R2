import axios from 'axios';
import { useMutation, useQuery } from 'react-query';

const useSearchIdMutation = () => {
  const fetcher = ({ email }: { email: string }) => axios.post('/sign-in/find-login-id', { email });

  return useMutation(fetcher);
};

const useRequestAuthCodeMutation = () => {
  const fetcher = ({ loginId, email }: { loginId: string; email: string }) =>
    axios.post('/sign-in/send-password-change-auth-code', { loginId, email });

  return useMutation(fetcher);
};

const useCheckAuthCodeQuery = ({ loginId, email, authCode }: { loginId: string; email: string; authCode: string }) => {
  const fetcher = () =>
    axios.get('/sign-in/check-auth-code', { params: { loginId, email, authCode } }).then(({ data }) => data);

  return useQuery(['checkAuthCode'], fetcher);
};
const useChangePasswordMutation = () => {
  const fetcher = ({
    email,
    loginId,
    authCode,
    password,
  }: {
    email: string;
    loginId: string;
    authCode: string;
    password: string;
  }) => axios.patch('/sign-in/change-password-for-missing', { email, loginId, authCode, password });

  return useMutation(fetcher);
};

export { useSearchIdMutation, useRequestAuthCodeMutation, useCheckAuthCodeQuery, useChangePasswordMutation };
