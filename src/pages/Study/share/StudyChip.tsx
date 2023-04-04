import React, { useState } from 'react';
import { Chip } from '@mui/material';

/**
 * TODO 공통 컴포넌트 제작 후 삭제 예정
 */
interface ChipProps {
  value: string;
}
interface ChipDismissibleProps {
  value: string;
  onClick: () => void;
}

export const StudyChip = ({ value }: ChipProps) => {
  return (
    <Chip
      className="!flex !h-[22px] !w-fit !items-center !rounded-[4px] !bg-pointBlue !bg-opacity-30 !px-1 !py-[2px] !text-[12px]"
      label={value}
    />
  );
};
export const StudyChipDismissible = ({ value, onClick }: ChipDismissibleProps) => {
  return (
    <Chip
      className="!flex !h-[22px] !w-fit !items-center !rounded-[4px] !bg-pointBlue !bg-opacity-30 !px-1 !py-[2px] !text-[12px]"
      onDelete={() => {
        if (onClick) onClick();
      }}
      label={value}
    />
  );
};
