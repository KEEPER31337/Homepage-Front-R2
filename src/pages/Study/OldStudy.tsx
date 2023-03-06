import React, { Fragment } from 'react';
import type { StudyListInfo } from '@mocks/StudyApi';
import StudyAccordion from './Accordion/StudyAccordion';

interface OldStudyProps {
  list: StudyListInfo[];
}
const OldStudy = ({ list }: OldStudyProps) => {
  return (
    <div className="">
      {/* TODO 추후 게시판이 구현되면 컴포넌트를 그대로 가져와서 사용할 예정!! */}
      {list?.map((study) => (
        <Fragment key={study.id}>
          <StudyAccordion study={study} />
        </Fragment>
      ))}
    </div>
  );
};

export default OldStudy;
