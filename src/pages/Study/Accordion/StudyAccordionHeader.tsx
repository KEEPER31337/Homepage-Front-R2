import React, { useState } from 'react';
import { Chip, Divider, Typography } from '@mui/material';
import { PeriodicInfo, StudyInfo } from '@api/dto';
import useCheckAuth from '@hooks/useCheckAuth';
import ActionButton from '@components/Button/ActionButton';
import ServerImg from '@components/Image/ServerImg';
import StudyModal from '../Modal/StudyModal';

interface StudyAccordionHeaderProps {
  study: StudyInfo;
  currentPeriod: PeriodicInfo;
}

const StudyAccordionHeader = ({ study, currentPeriod }: StudyAccordionHeaderProps) => {
  const [studyModalOpen, setStudyModalOpen] = useState(false);

  const { checkIsMyId } = useCheckAuth();

  const handleStudyEditButtonClick = () => {
    setStudyModalOpen(true);
  };

  const handleStudyDeleteButtonClick = () => {
    // TODO 스터디 제거 API 호출 후 새로고침(기능 구현 후 console 삭제 예정)
  };

  return (
    <div className="flex w-full items-center justify-between px-2">
      <div className="flex items-center space-x-4">
        <div className="relative h-16 w-16">
          <ServerImg
            className="absolute inset-0 h-full w-full object-cover"
            errorClassName="absolute inset-0 m-auto"
            src={study.thumbnailPath}
            alt="스터디 썸네일"
          />
        </div>
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
      </div>
      <div className="flex items-center space-x-2">
        <Typography>스터디장</Typography>
        <Chip className="!rounded-md !bg-pointBlue/30 font-semibold" label={study.headName} />
        <Divider variant="middle" className="!border-white" orientation="vertical" flexItem />
        <Typography>
          현재 인원 <span className="font-semibold">{study.memberCount}명</span>
        </Typography>
      </div>
      <StudyModal
        open={studyModalOpen}
        setOpen={setStudyModalOpen}
        selectedStudyInfo={study}
        currentPeriod={currentPeriod}
      />
    </div>
  );
};

export default StudyAccordionHeader;
