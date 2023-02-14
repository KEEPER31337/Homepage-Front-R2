import type { TypographyStylesType, InputStylesType } from '@material-tailwind/react';

interface CustomTheme {
  typography: TypographyStylesType;
  input: InputStylesType;
}

const theme: CustomTheme = {
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
          width: 'min-w-min',
        },
      },
    },
  },
};

export default theme;
