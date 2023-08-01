import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const memberState = atom({
  key: 'memberState',
  default: {
    roles: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export default memberState;
