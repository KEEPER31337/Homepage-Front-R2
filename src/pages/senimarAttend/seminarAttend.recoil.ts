import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const attendCountState = atom<number | 0>({
  key: 'attendCountState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export default attendCountState;
