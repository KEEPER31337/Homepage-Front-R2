import React, { Dispatch, DispatchWithoutAction, SetStateAction } from 'react';
import ServerImg from '@components/Image/ServerImg';
import { StudyInfo } from '@api/dto';
import useCheckAuth from '@hooks/useCheckAuth';
import { Typography } from '@mui/material';
import ActionButton from '@components/Button/ActionButton';
import OutlinedButton from '@components/Button/OutlinedButton';
import { ModalInfo } from '../Study.interface';

interface StudyAccordionHeaderProps {
  study: StudyInfo;
  toggleOpen: DispatchWithoutAction;
  setModalInfo: Dispatch<SetStateAction<ModalInfo>>;
}

const StudyAccordionHeader = ({ study, toggleOpen, setModalInfo }: StudyAccordionHeaderProps) => {
  const { checkIsMyId } = useCheckAuth();

  const handleStudyEditButtonClick = () => {
    toggleOpen();
    setModalInfo({ mode: 'Edit', selectedStudy: study });
  };
  const handleStudyDeleteButtonClick = () => {
    // TODO 스터디 제거 API 호출 후 새로고침(기능 구현 후 console 삭제 예정)
  };

  return (
    <div className="flex w-full items-center space-x-4 pl-2">
      <ServerImg
        className="h-16 w-16 object-cover"
        errorClassName="h-16 w-16"
        src={study.thumbnailPath}
        alt="스터디 썸네일"
      />
      <Typography variant="h3" fontWeight="semiBold">
        {study.title}
      </Typography>
      {checkIsMyId(study.headId) && (
        <div className="space-x-2">
          <ActionButton mode="edit" small onClick={handleStudyEditButtonClick}>
            수정
          </ActionButton>
          <ActionButton mode="delete" small onClick={handleStudyDeleteButtonClick}>
            삭제
          </ActionButton>
        </div>
      )}
      {/* <div className="flex w-full items-center justify-between space-x-2 pr-2">
        <div className="flex items-center space-x-2">
          <Typography className="!font-semibold">스터디장</Typography>
          <StudyChip fontWeight="Semibold" value={study.headMember.realName} />
          <Divider className="!border-white" orientation="vertical" flexItem />
          <Typography>
            현재 인원 <span className="font-semibold">{study.memberNumber}명</span>
          </Typography>
        </div>
      </div> */}
    </div>
  );
};

export default StudyAccordionHeader;
