import React, { Dispatch, DispatchWithoutAction, Fragment, SetStateAction } from 'react';
import type { StudyListInfo } from '@mocks/StudyApi';
import StudyAccordion from './Accordion/StudyAccordion';

interface OldStudyProps {
  list: StudyListInfo[];
  memberId: number;
  toggleOpen: DispatchWithoutAction;
  setSelectedStudyId: Dispatch<SetStateAction<number>>;
}
const OldStudy = ({ list, memberId, toggleOpen, setSelectedStudyId }: OldStudyProps) => {
  return (
    <div className="">
      오래된 스터디 목록
      {/* TODO 추후 게시판이 구현되면 컴포넌트를 그대로 가져와서 사용할 예정!! */}
      {list?.map((study) => (
        <Fragment key={study.id}>
          <StudyAccordion
            study={study}
            memberId={memberId}
            toggleOpen={toggleOpen}
            setSelectedStudyId={setSelectedStudyId}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default OldStudy;
