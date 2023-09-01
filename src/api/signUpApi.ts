import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { SignUpDuplication, SignUpInfo } from './dto';

const signUpKeys = {
  idDuplication: ['sighUp', 'duplication', 'loginId'] as const,
  emailDuplication: ['sighUp', 'duplication', 'email'] as const,
  studentIdDuplication: ['sighUp', 'duplication', 'studentId'] as const,
};

const useSignUpMutation = () => {
  const fetcher = (signUpInfo: SignUpInfo) => axios.post('/sign-up', signUpInfo);

  return useMutation(fetcher);
};

const useEmailAuthMutation = () => {
  const fetcher = (email: string) => axios.post('/sign-up/email-auth', { email });

  return useMutation(fetcher);
};

const useCheckLoginIdDuplicationQuery = ({ loginId }: { loginId: string }) => {
  const fetcher = () => axios.get('/sign-up/exists/login-id', { params: { loginId } }).then(({ data }) => data);

  return useQuery<SignUpDuplication>(signUpKeys.idDuplication, fetcher);
};

const useCheckEmailDuplicationQuery = ({ email }: { email: string }) => {
  const fetcher = () => axios.get('/sign-up/exists/email', { params: { email } }).then(({ data }) => data);

  return useQuery<SignUpDuplication>(signUpKeys.emailDuplication, fetcher);
};

const useCheckStudentIdDuplicationQuery = ({ studentId }: { studentId: string }) => {
  const fetcher = () => axios.get('/sign-up/exists/student-id', { params: { studentId } }).then(({ data }) => data);

  return useQuery<SignUpDuplication>(signUpKeys.studentIdDuplication, fetcher);
};

export {
  useSignUpMutation,
  useEmailAuthMutation,
  useCheckLoginIdDuplicationQuery,
  useCheckEmailDuplicationQuery,
  useCheckStudentIdDuplicationQuery,
};
