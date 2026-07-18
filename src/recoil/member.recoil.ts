import { MemberInfo } from '@api/dto';
import atomWithRecoilPersist from './recoilPersistStorage';

const memberState = atomWithRecoilPersist<MemberInfo | null>('memberState', null);

export default memberState;
