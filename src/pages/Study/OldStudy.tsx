import React, { Fragment } from 'react';
import StudyAccordion from './Accordion/StudyAccordion';

interface OldStudyProps {
  studyList: number[];
}

const OldStudy = ({ studyList }: OldStudyProps) => {
  return (
    <div className="">
      {/* TODO 추후 게시판이 구현되면 컴포넌트를 그대로 가져와서 사용할 예정!! */}
      {studyList?.map((study) => (
        <Fragment key={study}>
          <StudyAccordion />
        </Fragment>
      ))}
    </div>
  );
};

export default OldStudy;
