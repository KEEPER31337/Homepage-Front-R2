import React from 'react';
import { ThemeProvider, Select, Option } from '@material-tailwind/react';

interface SelectType {
  value: string;
  options: string[];
}
const theme = {
  select: {
    styles: {
      base: {
        container: {
          border: 'border-2',
          position: 'relative',
          width: 'w-[97px]',
          minWidth: 'min-w-[0px]',
        },
      },
    },
  },
};
const StudySelect = ({ value, options }: SelectType) => {
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
