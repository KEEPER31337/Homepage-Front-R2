import { Button } from '@material-tailwind/react';
import React from 'react';
import { MdOutlineApps, MdOutlineViewHeadline } from 'react-icons/md';

type switchType = 'List' | 'Grid';

interface TableViewSwitchButtonProps {
  type: switchType;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const TableViewSwitchButton = ({ type, isActive, onClick, disabled }: TableViewSwitchButtonProps) => {
  return (
    <Button
      variant="outlined"
      className={`flex h-8 w-8 items-center justify-center rounded-sm border p-0 focus:ring-0 ${
        isActive ? 'border-pointBlue text-[#4CEEF9]' : 'border-white text-white'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <div>{type === 'List' ? <MdOutlineViewHeadline size="20" /> : <MdOutlineApps size="20" />}</div>
    </Button>
  );
};

export default TableViewSwitchButton;
