import { atom } from 'recoil';

const signUpPageState = atom({
  key: 'signUpPageState',
  default: {
    loginId: '',
    email: '',
    realName: '',
    authCode: '',
    birthday: '',
    studentId: '',
    password: '',
  },
});

export default signUpPageState;
