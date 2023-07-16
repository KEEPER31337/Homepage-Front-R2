import type { InputStylesType, TypographyStylesType } from '@material-tailwind/react';

interface CustomTheme {
  typography: TypographyStylesType;
  input: InputStylesType;
}

const materialTailwindTheme: CustomTheme = {
  typography: {
    styles: {
      variants: {
        h1: {
          fontSize: 'text-[28px]',
        },
        h3: {
          fontSize: 'text-[20px]',
        },
        paragraph: {
          fontSize: 'text-[16px]',
        },
        small: {
          fontSize: 'text-[10px]',
        },
      },
    },
  },
  input: {
    defaultProps: {
      variant: 'standard',
    },
    styles: {
      base: {
        container: {
          width: 'min-w-min w-fit',
        },
        input: {
          border: '!border-pointBlue disabled:border-b disabled:!border-opacity-50',
          color: 'text-white',
          background: 'disabled:!bg-transparent',
        },
        label: {
          border: 'after:border-pointBlue peer-focus:after:border-pointBlue',
          color: ' peer-focus:text-pointBlue',
        },
      },
    },
  },
};

export default materialTailwindTheme;
