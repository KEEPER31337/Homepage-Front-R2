import React from 'react';
import { Textarea, ThemeProvider } from '@material-tailwind/react';

/**
 * TODO 공통 컴포넌트 제작 후 삭제 예정
 */

interface TextareaProps {
  variant: 'standard' | 'outlined' | 'static';
  label: string;
  placeholder: string;
}

const theme = {
  textarea: {
    styles: {
      base: {
        container: {
          position: 'relative',
          width: 'w-full',
          minWidth: 'min-w-[0px]',
        },
        textarea: {
          fontSize: 'text-[16px]',
          border: 'border-b-2',
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

const StudyTextarea = ({ variant, label, placeholder }: TextareaProps) => {
  return (
    <ThemeProvider value={theme}>
      <Textarea variant={variant} label={label} placeholder={placeholder} />
    </ThemeProvider>
  );
};

export default StudyTextarea;
