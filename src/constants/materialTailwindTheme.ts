import type { TypographyStylesType } from '@material-tailwind/react';

interface CustomTheme {
  typography: TypographyStylesType;
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
};

export default materialTailwindTheme;
