import React from 'react';
import { useNavigate } from 'react-router-dom';
import OutlinedButton from '@components/Button/OutlinedButton';
import PageTitle from '@components/Typography/PageTitle';
import WikiViewSwitchButton, { WikiViewType } from './Button/WikiViewSwitchButton';
import WikiSearchSection from './SearchSection/WikiSearchSection';
import WikiDocListSection from './Section/WikiDocListSection';
import WikiFrontSection from './Section/WikiFrontSection';

const WIKI_VIEW_PATH: Record<WikiViewType, string> = {
  Front: '/wiki/home',
  List: '/wiki/list',
};

interface WikiListProps {
  wikiView: WikiViewType;
}

const WikiList = ({ wikiView }: WikiListProps) => {
  const navigate = useNavigate();

  const changeWikiView = (newWikiView: WikiViewType) => {
    navigate(WIKI_VIEW_PATH[newWikiView]);
  };

  const handleWriteButtonClick = () => {
    navigate('/wiki/write');
  };

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle>위키</PageTitle>
        <OutlinedButton onClick={handleWriteButtonClick}>문서 작성</OutlinedButton>
      </div>
      <div className="flex items-center justify-between pb-5">
        {/* NOTE 대문과 목록은 같은 컴포넌트라 상태가 유지되므로, 보기를 바꿀 때 검색창을 URL 기준으로 다시 초기화합니다. */}
        <WikiSearchSection key={wikiView} />
        <WikiViewSwitchButton wikiView={wikiView} setWikiView={changeWikiView} />
      </div>
      {wikiView === 'Front' && <WikiFrontSection />}
      {wikiView === 'List' && <WikiDocListSection />}
    </div>
  );
};

export default WikiList;
