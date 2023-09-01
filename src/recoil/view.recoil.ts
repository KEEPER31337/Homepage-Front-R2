import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { TableType } from '@components/Button/TableViewSwitchButton';

const { persistAtom } = recoilPersist();

const tableViewState = atom<TableType>({
  key: 'tableViewState',
  default: 'List',
  effects_UNSTABLE: [persistAtom],
});

export default tableViewState;
