import React from 'react';
import { useRecoilState } from 'recoil';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { MdOutlineApps, MdOutlineViewHeadline } from 'react-icons/md';
import tableViewState from '@recoil/view.recoil';

export type TableType = 'List' | 'Grid';

const TableViewSwitchButton = () => {
  const [tableView, setTableView] = useRecoilState(tableViewState);

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
