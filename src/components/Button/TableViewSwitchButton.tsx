import tableTypeState from '@atoms/TableAtoms';
import { TableType } from '@components/Table/StandardTable.interface';
import { Button } from '@material-tailwind/react';
import React from 'react';
import { MdOutlineApps, MdOutlineViewHeadline } from 'react-icons/md';
import { useRecoilState } from 'recoil';

interface TableViewSwitchButtonProps {
  type: TableType;
  disabled?: boolean;
}

const TableViewSwitchButton = ({ type, disabled }: TableViewSwitchButtonProps) => {
  const [tableType, setTableType] = useRecoilState<TableType>(tableTypeState);

  return (
    <Button
      variant="outlined"
      className={`flex h-8 w-8 items-center justify-center rounded-sm border p-0 focus:ring-0 ${
        tableType === type ? 'border-pointBlue text-[#4CEEF9]' : 'border-white text-white'
      }`}
      onClick={() => setTableType(type)}
      disabled={disabled}
    >
      <div>{type === 'List' ? <MdOutlineViewHeadline size="20" /> : <MdOutlineApps size="20" />}</div>
    </Button>
  );
};

export default TableViewSwitchButton;
