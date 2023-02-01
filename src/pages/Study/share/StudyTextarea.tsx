import React from 'react';
import { ThemeProvider, Textarea } from '@material-tailwind/react';

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
        },
        label: {
          fontSize: 'text-[16px]',
        },
      },
    },
  },
};
interface TextareaType {
  variant: 'standard' | 'outlined' | 'static';
  label: string;
  placeholder: string;
}
const StudyTextarea = ({ variant, label, placeholder }: TextareaType) => {
  return (
    <ThemeProvider value={theme}>
      <Textarea variant={variant} label={label} placeholder={placeholder} />
    </ThemeProvider>
  );
};

export default StudyTextarea;
