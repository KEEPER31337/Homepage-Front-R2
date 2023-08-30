import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const starterState = atom<number | undefined>({
  key: 'starterState',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export default starterState;
