import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { MdOutlineApps, MdOutlineViewHeadline } from 'react-icons/md';
import { TableType } from '@components/Table/StandardTable.interface';

interface TableViewSwitchButtonProps {
  tableView: TableType;
  setTableView: (tableView: TableType) => void;
}

const TableViewSwitchButton = ({ tableView, setTableView }: TableViewSwitchButtonProps) => {
  const handleTableView = (event: React.MouseEvent<HTMLElement>, newTableView: TableType | null) => {
    if (!newTableView) return;
    setTableView(newTableView);
  };

  return (
    <ToggleButtonGroup exclusive size="small" value={tableView} onChange={handleTableView}>
      <ToggleButton value="List" aria-label="List">
        <MdOutlineViewHeadline size="20" />
      </ToggleButton>
      <ToggleButton value="Grid" aria-label="Grid">
        <MdOutlineApps size="20" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TableViewSwitchButton;
