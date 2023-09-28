import React from 'react';
import { Chip, Divider, Typography } from '@mui/material';
import { StudyInfo } from '@api/dto';
import ServerImg from '@components/Image/ServerImg';

interface StudyAccordionHeaderProps {
  study: StudyInfo;
}

const StudyAccordionHeader = ({ study }: StudyAccordionHeaderProps) => {
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
      </div>
      <div className="flex items-center space-x-2">
        <Typography>스터디장</Typography>
        <Chip className="!rounded-md !bg-pointBlue/30 font-semibold" label={study.headName} />
        <Divider variant="middle" className="!border-white" orientation="vertical" flexItem />
        <Typography>
          현재 인원 <span className="font-semibold">{study.memberCount}명</span>
        </Typography>
      </div>
    </div>
  );
};

export default StudyAccordionHeader;
