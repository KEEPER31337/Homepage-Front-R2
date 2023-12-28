import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { SignUpDuplication, SignUpInfo } from './dto';

export const signUpKeys = {
  idDuplication: (params: { loginId: string }) => ['sighUp', 'duplication', 'loginId', params] as const,
  emailDuplication: (params: { email: string }) => ['sighUp', 'duplication', 'email', params] as const,
  studentIdDuplication: (params: { studentId: string }) => ['sighUp', 'duplication', 'studentId', params] as const,
};

const useSignUpMutation = () => {
  const fetcher = (signUpInfo: SignUpInfo) => axios.post('/sign-up', signUpInfo);

  return useMutation(fetcher);
};

const useEmailAuthMutation = () => {
  const fetcher = (email: string) => axios.post('/sign-up/email-auth', { email }).then(({ data }) => data);

  return useMutation(fetcher);
};

const useCheckLoginIdDuplicationQuery = ({ loginId, enabled }: { loginId: string; enabled: boolean }) => {
  const params = { loginId };
  const fetcher = () => axios.get('/sign-up/exists/login-id', { params }).then(({ data }) => data);

  return useQuery<SignUpDuplication>(signUpKeys.idDuplication(params), fetcher, { enabled });
};

const useCheckEmailDuplicationQuery = ({ email, enabled }: { email: string; enabled: boolean }) => {
  const params = { email };
  const fetcher = () => axios.get('/sign-up/exists/email', { params }).then(({ data }) => data);

  return useQuery<SignUpDuplication>(signUpKeys.emailDuplication(params), fetcher, { enabled });
};

const useCheckStudentIdDuplicationQuery = ({ studentId, enabled }: { studentId: string; enabled: boolean }) => {
  const params = { studentId };
  const fetcher = () => axios.get('/sign-up/exists/student-id', { params }).then(({ data }) => data);

  return useQuery<SignUpDuplication>(signUpKeys.studentIdDuplication(params), fetcher, { enabled });
};

export {
  useSignUpMutation,
  useEmailAuthMutation,
  useCheckLoginIdDuplicationQuery,
  useCheckEmailDuplicationQuery,
  useCheckStudentIdDuplicationQuery,
};
