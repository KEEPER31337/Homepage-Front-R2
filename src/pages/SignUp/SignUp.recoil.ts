import { atom } from 'recoil';

const signUpPageState = atom({
  key: 'signUpPageState',
  default: {
    loginId: '',
    email: '',
    realName: '',
    nickname: '',
    authCode: '',
    birthday: '',
    studentId: '',
    password: '',
  },
});

export default signUpPageState;
