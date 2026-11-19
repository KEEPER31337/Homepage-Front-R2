import React from 'react';
import StandardViewer from '@components/Viewer/StandardViewer';
import WikiRecentDocSection from './WikiRecentDocSection';

const WIKI_HERO_INTRO_MARKDOWN = `# KEEPER 위키 대문

KEEPER 위키에 오신 것을 환영합니다.
기존 문서를 편집하거나, 상단에 문서 작성을 통해서 새로운 문서를 생성할 수 있습니다. 
`;

const WikiHeroSection = () => {
  return (
    <div className="bg-middleBlack px-6 pb-8 pt-3 sm:px-14 sm:py-10">
      <StandardViewer content={WIKI_HERO_INTRO_MARKDOWN} />
      <WikiRecentDocSection />
    </div>
  );
};

export default WikiHeroSection;
