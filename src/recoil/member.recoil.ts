import { Role } from '@api/dto';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const memberState = atom<{ roles: Role[] }>({
  key: 'memberState',
  default: {
    roles: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export default memberState;
