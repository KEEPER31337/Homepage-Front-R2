/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, DispatchWithoutAction, Fragment, SetStateAction } from 'react';
import type { StudyInfo } from '@api/dto';
import { ModalInfo } from './Study.interface';

interface OldStudyProps {
  list: StudyInfo[];
  memberId: number;
  toggleOpen: DispatchWithoutAction;
  setModalInfo: Dispatch<SetStateAction<ModalInfo>>;
}

const OldStudy = ({ list, memberId, toggleOpen, setModalInfo }: OldStudyProps) => {
  return (
    <div>
      오래된 스터디 목록
      {/* TODO 추후 게시판이 구현되면 컴포넌트를 그대로 가져와서 사용할 예정!! */}
      {list?.map((study) => (
        <Fragment key={study.studyId}>
          <p>{study.title}</p>
        </Fragment>
      ))}
    </div>
  );
};

export default OldStudy;
