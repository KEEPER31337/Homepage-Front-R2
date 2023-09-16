import React from 'react';
import Typography from '@mui/material/Typography';
import { VscPinned } from 'react-icons/vsc';

interface BookGuideProps {
  children: React.ReactNode;
}
const BookGuide = ({ children }: BookGuideProps) => {
  return (
    <div className="flex">
      <VscPinned className="fill-pointBlue" size={24} />
      <Typography>{children}</Typography>
    </div>
  );
};

export default BookGuide;
