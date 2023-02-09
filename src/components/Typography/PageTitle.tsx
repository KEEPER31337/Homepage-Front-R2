import React, { ReactNode } from 'react';
import { Typography } from '@material-tailwind/react';

interface PageTitleProps {
  children: ReactNode;
}

const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <Typography variant="h1" className="font-base text-pointBlue">
      {children}
    </Typography>
  );
};

export default PageTitle;
