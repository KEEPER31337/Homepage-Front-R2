import axios from 'axios';
import { useMutation } from 'react-query';

// eslint-disable-next-line import/prefer-default-export, func-names, consistent-return
export const login = async function ({ loginId, password }: { loginId: string; password: string }) {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, { loginId, password }, { withCredentials: true });
  } catch (error) {
    return '아이디 혹은 비밀번호를 확인하세요.';
  }
};

export const loginMutation = useMutation(login, {
  onMutate: (variable) => {
    console.log('onMutate', variable);
    // variable : {loginId: 'xxx', password; 'xxx'}
  },
  onError: (error, variable, context) => {
    // error
  },
  onSuccess: (data, variables, context) => {
    console.log('success', data, variables, context);
  },
  onSettled: () => {
    console.log('end');
  },
});
