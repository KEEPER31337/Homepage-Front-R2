import React from 'react';
import { Typography, Avatar } from '@mui/material';
import { MemberDetailInfo } from '@api/dto';
import { getServerImgUrl } from '@utils/converter';

interface MemberCardProps {
  memberInfo: MemberDetailInfo;
  onClick: () => void;
  isSelected?: boolean;
}

const MemberCard = ({ memberInfo, onClick, isSelected }: MemberCardProps) => {
  const handleCardClick = () => {
    onClick();
  };

  console.log(isSelected);
  return (
    <button
      type="button"
      onClick={handleCardClick}
      className={`${
        isSelected && '!border-pointBlue'
      } flex h-fit items-center border border-transparent bg-middleBlack/50 p-1
      `}
    >
      <Avatar
        className="mr-1 !h-7 !w-7 !bg-subBlack !text-white "
        src={memberInfo?.thumbnailPath ? getServerImgUrl(memberInfo?.thumbnailPath) : ''}
      />
      <Typography variant="small" className="!mr-1 w-8 text-right">
        {memberInfo.generation}기
      </Typography>
      <Typography className="!text-[14px]">{memberInfo.realName}</Typography>
    </button>
  );
};

export default MemberCard;
