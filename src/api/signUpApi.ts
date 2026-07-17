import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SignUpDuplication, SignUpInfo } from './dto';

export const signUpKeys = {
  base: ['sighUp'] as const,
  duplication: () => [...signUpKeys.base, 'exists'] as const,
  loginIdDuplication: (params: { loginId: string }) => [...signUpKeys.duplication(), 'loginId', params] as const,
  emailDuplication: (params: { email: string }) => [...signUpKeys.duplication(), 'email', params] as const,
  studentIdDuplication: (params: { studentId: string }) => [...signUpKeys.duplication(), 'studentId', params] as const,
};

const useSignUpMutation = () => {
  const fetcher = (signUpInfo: SignUpInfo) => axios.post('/sign-up', signUpInfo);

  return useMutation({ mutationFn: fetcher });
};

const useEmailAuthMutation = () => {
  const fetcher = (email: string) => axios.post('/sign-up/email-auth', { email }).then(({ data }) => data);

  return useMutation({ mutationFn: fetcher });
};

const useCheckLoginIdDuplicationQuery = ({ loginId, enabled }: { loginId: string; enabled: boolean }) => {
  const params = { loginId };
  const fetcher = () => axios.get('/sign-up/exists/login-id', { params }).then(({ data }) => data);

  return useQuery<SignUpDuplication>({ queryKey: signUpKeys.loginIdDuplication(params), queryFn: fetcher, enabled });
};

const useCheckEmailDuplicationQuery = ({ email, enabled }: { email: string; enabled: boolean }) => {
  const params = { email };
  const fetcher = () => axios.get('/sign-up/exists/email', { params }).then(({ data }) => data);

  return useQuery<SignUpDuplication>({ queryKey: signUpKeys.emailDuplication(params), queryFn: fetcher, enabled });
};

const useCheckStudentIdDuplicationQuery = ({ studentId, enabled }: { studentId: string; enabled: boolean }) => {
  const params = { studentId };
  const fetcher = () => axios.get('/sign-up/exists/student-id', { params }).then(({ data }) => data);

  return useQuery<SignUpDuplication>({ queryKey: signUpKeys.studentIdDuplication(params), queryFn: fetcher, enabled });
};

export {
  useSignUpMutation,
  useEmailAuthMutation,
  useCheckLoginIdDuplicationQuery,
  useCheckEmailDuplicationQuery,
  useCheckStudentIdDuplicationQuery,
};
