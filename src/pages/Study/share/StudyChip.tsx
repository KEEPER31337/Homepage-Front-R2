import React from 'react';
import { Chip } from '@mui/material';

/**
 * TODO 공통 컴포넌트 제작 후 삭제 예정
 */
interface ChipProps {
  value: string;
  fontWeight?: 'Normal' | 'Semibold';
}

interface ChipDismissibleProps {
  value: string;
  fontWeight?: 'Normal' | 'Semibold';
  onClick: () => void;
}

export const StudyChip = ({ fontWeight, value }: ChipProps) => {
  return (
    <Chip
      className={`${
        fontWeight === 'Semibold' ? 'font-semibold' : ''
      } !flex !h-[22px] !w-fit !items-center !rounded-[4px] !bg-pointBlue !bg-opacity-30 !px-1 !py-[2px] !text-[12px]`}
      label={value}
    />
  );
};
export const StudyChipDismissible = ({ fontWeight, value, onClick }: ChipDismissibleProps) => {
  return (
    <Chip
      className={`${
        fontWeight === 'Semibold' ? 'font-semibold' : ''
      } "!flex !h-[22px] !w-fit !items-center !rounded-[4px] !bg-pointBlue !bg-opacity-30 !px-1 !py-[2px] !text-[12px]`}
      onDelete={() => {
        if (onClick) onClick();
      }}
      label={value}
    />
  );
};
