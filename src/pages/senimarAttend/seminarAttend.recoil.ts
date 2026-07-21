import atomWithRecoilPersist from '@recoil/recoilPersistStorage';

const attendCountState = atomWithRecoilPersist('attendCountState', 0);

export default attendCountState;
