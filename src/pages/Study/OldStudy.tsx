import React, { Fragment } from 'react';
import StudyItem from './StudyItem';

interface OldStudyProps {
  studyList: number[];
}

const OldStudy = ({ studyList }: OldStudyProps) => {
  return (
    <div className="">
      {/* TODO 추후 게시판이 구현되면 컴포넌트를 그대로 가져와서 사용할 예정!! */}
      {studyList?.map((study) => (
        <Fragment key={study}>
          <StudyItem id={study} />
        </Fragment>
      ))}
    </div>
  );
};

export default OldStudy;
