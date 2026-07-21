import { atom } from 'jotai';

const signUpPageState = atom({
  loginId: '',
  email: '',
  realName: '',
  authCode: '',
  birthday: '',
  studentId: '',
  password: '',
});

export default signUpPageState;
