import React from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { MdOutlineHome, MdOutlineViewHeadline } from 'react-icons/md';

const WIKI_HOME_PATH = '/wiki/home';
const WIKI_LIST_PATH = '/wiki/list';

const WikiViewSwitchButton = () => {
  const navigate = useNavigate();
  const isHome = useMatch(WIKI_HOME_PATH) !== null;
  const isList = useMatch(WIKI_LIST_PATH) !== null;
  /* NOTE 태그별 문서 목록(/wiki/tag/:tagId)처럼 대문도 전체 목록도 아닌 화면에서는 어느 쪽도 선택하지 않습니다. */
  const currentPath = (isHome && WIKI_HOME_PATH) || (isList && WIKI_LIST_PATH) || null;

  const handleWikiView = (event: React.MouseEvent<HTMLElement>, newPath: string | null) => {
    if (!newPath) return;
    navigate(newPath);
  };

  return (
    <ToggleButtonGroup exclusive size="small" value={currentPath} onChange={handleWikiView}>
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
