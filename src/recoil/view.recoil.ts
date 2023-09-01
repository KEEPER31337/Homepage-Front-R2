import { TableType } from '@components/Table/StandardTable.interface';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const tableViewState = atom<TableType>({
  key: 'tableViewState',
  default: 'List',
  effects_UNSTABLE: [persistAtom],
});

export default tableViewState;
