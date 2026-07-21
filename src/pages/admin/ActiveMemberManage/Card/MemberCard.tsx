import React from 'react';
import { Typography } from '@mui/material';
import { MemberDetailInfo } from '@api/dto';
import CommonAvatar from '@components/Avatar/CommonAvatar';

interface MemberCardProps {
  memberInfo: MemberDetailInfo;
  onClick: () => void;
  isSelected?: boolean;
}

const MemberCard = ({ memberInfo, onClick, isSelected }: MemberCardProps) => {
  const handleCardClick = () => {
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleCardClick}
      className={`${
        isSelected && '!border-pointBlue'
      } flex h-fit items-center border border-transparent bg-middleBlack/50 p-1`}
    >
      <CommonAvatar className="mr-1 !h-7 !w-7" userId={memberInfo.memberId} thumbnailPath={memberInfo.thumbnailPath} />
      <Typography className="!text-[14px]">{memberInfo.realName}</Typography>
      <Typography variant="small" className="!ml-1">
        ({memberInfo.generation})
      </Typography>
    </button>
  );
};

export default MemberCard;
