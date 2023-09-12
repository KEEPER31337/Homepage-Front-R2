import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { SignUpDuplication, SignUpInfo } from './dto';

export const signUpKeys = {
  idDuplication: ['sighUp', 'duplication', 'loginId'] as const,
  emailDuplication: (email: string) => ['sighUp', 'duplication', 'email', email] as const,
  studentIdDuplication: (studentId: string) => ['sighUp', 'duplication', 'studentId', studentId] as const,
};

const useSignUpMutation = () => {
  const fetcher = (signUpInfo: SignUpInfo) => axios.post('/sign-up', signUpInfo);

  return useMutation(fetcher);
};

const useEmailAuthMutation = () => {
  const fetcher = (email: string) => axios.post('/sign-up/email-auth', { email }).then(({ data }) => data);

  return useMutation(fetcher);
};

const useCheckLoginIdDuplicationQuery = ({ loginId }: { loginId: string }) => {
  const fetcher = () => axios.get('/sign-up/exists/login-id', { params: { loginId } }).then(({ data }) => data);

  return useQuery<SignUpDuplication>(signUpKeys.idDuplication, fetcher);
};

const useCheckEmailDuplicationQuery = ({ email, enabled }: { email: string; enabled: boolean }) => {
  const fetcher = () => axios.get('/sign-up/exists/email', { params: { email } }).then(({ data }) => data);

  return useQuery<SignUpDuplication>(signUpKeys.emailDuplication(email), fetcher, { enabled });
};

const useCheckStudentIdDuplicationQuery = ({ studentId, enabled }: { studentId: string; enabled: boolean }) => {
  const fetcher = () => axios.get('/sign-up/exists/student-id', { params: { studentId } }).then(({ data }) => data);

  return useQuery<SignUpDuplication>(signUpKeys.studentIdDuplication(studentId), fetcher, { enabled });
};

export {
  useSignUpMutation,
  useEmailAuthMutation,
  useCheckLoginIdDuplicationQuery,
  useCheckEmailDuplicationQuery,
  useCheckStudentIdDuplicationQuery,
};
