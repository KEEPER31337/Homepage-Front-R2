import { TableType } from '@components/Table/StandardTable.interface';
import { atom } from 'recoil';

const tableTypeState = atom<TableType>({
  key: 'tableType',
  default: 'List',
});

export default tableTypeState;
