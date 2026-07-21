import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useSearchIdMutation = () => {
  const fetcher = ({ email }: { email: string }) => axios.post('/sign-in/find-login-id', { email });

  return useMutation({ mutationFn: fetcher });
};

const useRequestAuthCodeMutation = () => {
  const fetcher = ({ loginId, email }: { loginId: string; email: string }) =>
    axios.post('/sign-in/send-password-change-auth-code', { loginId, email }).then(({ data }) => data);

  return useMutation({ mutationFn: fetcher });
};

const useCheckAuthCodeMutation = () => {
  const fetcher = ({ loginId, email, authCode }: { loginId: string; email: string; authCode: string }) =>
    axios.get('/sign-in/check-auth-code', { params: { loginId, email, authCode } }).then(({ data }) => data);

  return useMutation({ mutationFn: fetcher });
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

  return useMutation({ mutationFn: fetcher });
};

export { useSearchIdMutation, useRequestAuthCodeMutation, useCheckAuthCodeMutation, useChangePasswordMutation };
