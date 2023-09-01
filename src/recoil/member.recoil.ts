import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { MemberInfo } from '@api/dto';

const { persistAtom } = recoilPersist();

const memberState = atom<MemberInfo | null>({
  key: 'memberState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default memberState;
