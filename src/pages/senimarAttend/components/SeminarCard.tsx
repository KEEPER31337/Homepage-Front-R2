import React, { ReactNode } from 'react';
import { ThemeProvider, Card, CardBody } from '@material-tailwind/react';

interface SeminarCardProps {
  children: ReactNode;
}
const SeminarCard = ({ children }: SeminarCardProps) => {
  return (
    <ThemeProvider>
      <Card className="h-[426px] w-96 bg-mainBlack">
        <CardBody className="my-auto h-[281px] content-between items-center p-0 text-pointBlue">{children}</CardBody>
      </Card>
    </ThemeProvider>
  );
};

export default SeminarCard;
