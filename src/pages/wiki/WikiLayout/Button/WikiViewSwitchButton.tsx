import React from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { MdOutlineHome, MdOutlineViewHeadline } from 'react-icons/md';

const WIKI_HOME_PATH = '/wiki/home';
const WIKI_LIST_PATH = '/wiki/list';

const WikiViewSwitchButton = () => {
  const navigate = useNavigate();
  const isList = useMatch(WIKI_LIST_PATH) !== null;

  const handleWikiView = (event: React.MouseEvent<HTMLElement>, newPath: string | null) => {
    if (!newPath) return;
    navigate(newPath);
  };

  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={isList ? WIKI_LIST_PATH : WIKI_HOME_PATH}
      onChange={handleWikiView}
    >
      <ToggleButton value={WIKI_HOME_PATH} aria-label="대문">
        <MdOutlineHome size="20" />
      </ToggleButton>
      <ToggleButton value={WIKI_LIST_PATH} aria-label="목록">
        <MdOutlineViewHeadline size="20" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default WikiViewSwitchButton;
