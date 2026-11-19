import React from 'react';
import { useNavigate } from 'react-router-dom';
import OutlinedButton from '@components/Button/OutlinedButton';
import PageTitle from '@components/Typography/PageTitle';
import WikiViewSwitchButton, { WikiViewType } from './Button/WikiViewSwitchButton';
import WikiSearchSection from './Section/WikiSearchSection';
import WikiDocListSection from './Section/WikiDocListSection';
import WikiHeroSection from './Section/WikiHeroSection';

const WIKI_VIEW_PATH: Record<WikiViewType, string> = {
  Hero: '/wiki/home',
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
        <WikiSearchSection key={wikiView} />
        <WikiViewSwitchButton wikiView={wikiView} setWikiView={changeWikiView} />
      </div>
      {wikiView === 'Hero' && <WikiHeroSection />}
      {wikiView === 'List' && <WikiDocListSection />}
    </div>
  );
};

export default WikiList;
