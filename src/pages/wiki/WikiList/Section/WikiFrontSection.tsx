import React from 'react';
import StandardViewer from '@components/Viewer/StandardViewer';
import { WIKI_FRONT_INTRO_MARKDOWN } from '../wikiFront';
import WikiRecentDocSection from './WikiRecentDocSection';

const WikiFrontSection = () => {
  return (
    <div className="bg-middleBlack px-6 pb-8 pt-3 sm:px-14 sm:py-10">
      <StandardViewer content={WIKI_FRONT_INTRO_MARKDOWN} />
      <WikiRecentDocSection />
    </div>
  );
};

export default WikiFrontSection;
