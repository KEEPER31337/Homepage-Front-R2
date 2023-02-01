import React, { Fragment, useState } from 'react';
import { ThemeProvider, Chip } from '@material-tailwind/react';

interface ChipType {
  value: string;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
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
export const StudyChip = ({
  value,
  onClick = () => {
    console.log('a');
  },
}: ChipType) => {
  return (
    <ThemeProvider value={theme}>
      <Chip value={value} />
    </ThemeProvider>
  );
};
export const StudyChipDismissible = ({ value, onClick }: ChipType) => {
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
