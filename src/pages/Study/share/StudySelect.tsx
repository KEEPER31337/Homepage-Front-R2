import React from 'react';
import { ThemeProvider, Select, Option } from '@material-tailwind/react';

interface SelectProps {
  value: string;
  options: string[];
}
const theme = {
  select: {
    styles: {
      base: {
        container: {
          position: 'relative',
          width: 'w-[97px]',
          minWidth: 'min-w-[0px]',
        },
        select: {
          fontColor: 'text-white',
          borderColor: '!border-pointBlue',
          backdrop: '::backdrop:!ring-red-300',
        },
        arrow: {
          initial: {
            fontColor: '!text-white',
            width: 'w-[16px]',
            height: 'h-[16px]',
          },
        },
        menu: {
          bgColor: 'bg-middleBlack',
          borderColr: 'border-middleBlack',
        },
        option: {
          initial: {
            fontColor: 'text-white',
            hover: 'hover:!bg-gray-600 hover:text-white',
          },
          active: {
            fontColor: 'text-white',
            bgColor: 'bg-gray-600',
          },
        },
      },
    },
  },
};
const StudySelect = ({ value, options }: SelectProps) => {
  return (
    <ThemeProvider value={theme}>
      <Select variant="static" className="" value={value}>
        {options?.map((option) => (
          <Option key={option}>{option}</Option>
        ))}
      </Select>
    </ThemeProvider>
  );
};

export default StudySelect;
