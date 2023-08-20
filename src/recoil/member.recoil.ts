import { MemberInfo } from '@api/dto';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const memberState = atom<MemberInfo | null>({
  key: 'memberState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default memberState;
