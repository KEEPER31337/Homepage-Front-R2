import React, { ReactNode } from 'react';
import { Typography } from '@mui/material';

interface PageTitleProps {
  children: ReactNode;
}

const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <Typography variant="h1" className="!mb-8 font-base !font-semibold text-pointBlue">
      {children}
    </Typography>
  );
};

export default PageTitle;
