import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { MdOutlineHome, MdOutlineViewHeadline } from 'react-icons/md';

export type WikiViewType = 'Hero' | 'List';

interface WikiViewSwitchButtonProps {
  wikiView: WikiViewType;
  setWikiView: (wikiView: WikiViewType) => void;
}

const WikiViewSwitchButton = ({ wikiView, setWikiView }: WikiViewSwitchButtonProps) => {
  const handleWikiView = (event: React.MouseEvent<HTMLElement>, newWikiView: WikiViewType | null) => {
    if (!newWikiView) return;
    setWikiView(newWikiView);
  };

  return (
    <ToggleButtonGroup exclusive size="small" value={wikiView} onChange={handleWikiView}>
      <ToggleButton value="Hero" aria-label="대문">
        <MdOutlineHome size="20" />
      </ToggleButton>
      <ToggleButton value="List" aria-label="목록">
        <MdOutlineViewHeadline size="20" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default WikiViewSwitchButton;
