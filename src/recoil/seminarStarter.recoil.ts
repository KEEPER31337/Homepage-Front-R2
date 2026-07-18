import atomWithRecoilPersist from './recoilPersistStorage';

const starterState = atomWithRecoilPersist<number | undefined>('starterState', undefined);

export default starterState;
