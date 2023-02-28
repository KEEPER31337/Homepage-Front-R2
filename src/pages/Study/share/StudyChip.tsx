import React, { useState } from 'react';
import { ThemeProvider, Chip } from '@material-tailwind/react';

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
const theme = {
  chip: {
    styles: {
      base: {
        font: 'text-[12px]',
        width: 'w-fit',
        height: 'h-[22px]',
        paddingRight: 'px-[8px]',
        paddingTop: 'py-[2px]',
        display: 'flex',
        alignItems: 'items-center',
      },
      variants: {
        filled: {
          blue: {
            borderRadius: 'rounded-[4px]',
            background: 'bg-pointBlue',
            opacity: 'bg-opacity-30',
            color: 'text-white',
          },
        },
      },
      closeButtonColor: {
        blue: {
          display: 'flex',
          height: 'h-[14px]',
          weight: 'w-[14px]',
          borderRadius: 'rounded-[2px]',
          fontColor: 'text-pointBlue',
          bgColor: 'bg-subBlack',
          hover: 'hover:bg-middleBlack',
        },
      },
    },
  },
};
export const StudyChip = ({ value }: ChipProps) => {
  return (
    <ThemeProvider value={theme}>
      <Chip value={value} />
    </ThemeProvider>
  );
};
export const StudyChipDismissible = ({ value, onClick }: ChipDismissibleProps) => {
  const [show, setShow] = useState(true);
  return (
    <ThemeProvider value={theme}>
      <Chip
        show={show}
        dismissible={{
          onClose: () => {
            setShow(false);
            if (onClick) onClick();
          },
        }}
        value={value}
      />
    </ThemeProvider>
  );
};
