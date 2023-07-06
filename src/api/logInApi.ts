import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const login = async ({ loginId, password }: { loginId: string; password: string }) => {
  try {
    const response = await axios.post('/sign-in', { loginId, password }, { withCredentials: true });
    const { accessToken } = response.data;
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    return response.data;
  } catch (error) {
    return '아이디 혹은 비밀번호를 확인하세요.';
  }
};
