import React from 'react';
import { MdOutlineApps, MdOutlineViewHeadline } from 'react-icons/md';

type switchType = 'List' | 'Grid';

interface TableViewSwitchButtonProps {
  type: switchType;
  isActive?: boolean;
}

const TableViewSwitchButton = ({ type, isActive }: TableViewSwitchButtonProps) => {
  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-sm border ${
        isActive ? 'border-pointBlue' : 'border-white'
      }`}
    >
      {type === 'List' ? <MdOutlineViewHeadline size="20" color="#4CEEF9" /> : <MdOutlineApps size="20" />}
    </div>
  );
};

export default TableViewSwitchButton;
