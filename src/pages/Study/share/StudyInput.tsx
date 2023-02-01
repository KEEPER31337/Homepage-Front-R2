import React from 'react';
import { ThemeProvider, Input } from '@material-tailwind/react';

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
          border: 'border-b-2',
          borderColor: '!border-pointBlue',
        },
        label: {
          fontSize: 'text-[16px]',
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
          border: 'border-b-1',
          borderColor: '!border-pointBlue',
        },
        label: {
          border: 'border-2',
          fontSize: 'text-[12px]',
        },
      },
    },
  },
};
interface InputType {
  variant: 'standard' | 'outlined' | 'static';
  size: 'md' | 'lg';
  label: string;
  placeholder: string;
}
const StudyInput = ({ variant, size, label, placeholder }: InputType) => {
  return (
    <ThemeProvider value={size === 'md' ? mdTheme : lgTheme}>
      <Input variant={variant} label={label} placeholder={placeholder} />
    </ThemeProvider>
  );
};

export default StudyInput;
