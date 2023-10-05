import React from 'react';
import { Divider, Typography } from '@mui/material';
import { StudyInfo } from '@api/dto';
import MemberChip from '@components/Chip/MemberChip';
import ServerImg from '@components/Image/ServerImg';

interface StudyAccordionHeaderProps {
  study: StudyInfo;
}

const StudyAccordionHeader = ({ study }: StudyAccordionHeaderProps) => {
  return (
    <div className="flex w-full flex-col justify-between gap-2 px-2 sm:flex-row sm:items-center">
      <div className="flex items-center space-x-4">
        <div className="relative h-8 w-8 sm:h-16 sm:w-16">
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
      </div>
      <div className="flex items-center space-x-2">
        <Typography>스터디장</Typography>
        <MemberChip className="!rounded" label={study.headName} />
        <Divider variant="middle" className="!border-white" orientation="vertical" flexItem />
        <Typography>
          현재 인원 <span className="font-semibold">{study.memberCount}명</span>
        </Typography>
      </div>
    </div>
  );
};

export default StudyAccordionHeader;
