import React from 'react';
import { ThemeProvider, Input } from '@material-tailwind/react';

interface InputProps {
  variant: 'standard' | 'outlined' | 'static';
  size: 'md' | 'lg';
  label: string;
  placeholder: string;
}

const lgTheme = {
  input: {
    styles: {
      base: {
        container: {
          position: 'relative',
          width: 'w-full',
          minWidth: 'min-w-[0px]',
        },
        input: {
          fontSize: 'text-[16px]',
          border: 'border-b-[2px]',
          borderColor: '!border-pointBlue',
          fontColor: '!text-white',
          placeholder: 'placeholder:text-subGray',
        },
        label: {
          fontSize: 'text-[16px]',
          fontColor: '!text-pointBlue',
          focus: 'peer-focus:text-[16px]',
        },
      },
    },
  },
};
const mdTheme = {
  input: {
    styles: {
      base: {
        container: {
          position: 'relative',
          width: 'w-full',
          minWidth: 'min-w-[0px]',
        },
        input: {
          fontSize: 'text-[16px]',
          border: 'border-b-[1px]',
          borderColor: '!border-pointBlue',
          fontColor: '!text-white',
          placeholder: 'placeholder:text-subGray',
        },
        label: {
          fontSize: 'text-[12px]',
          fontColor: '!text-pointBlue',
          focus: 'peer-focus:text-[12px]',
        },
      },
    },
  },
};

const StudyInput = ({ variant, size, label, placeholder }: InputProps) => {
  return (
    <ThemeProvider value={size === 'md' ? mdTheme : lgTheme}>
      <Input variant={variant} label={label} placeholder={placeholder} />
    </ThemeProvider>
  );
};

export default StudyInput;
