import React, { ReactNode } from 'react';
import { Card, CardContent } from '@mui/material';

interface SeminarCardProps {
  children: ReactNode;
}
const SeminarCard = ({ children }: SeminarCardProps) => {
  return (
    <Card className="flex h-[426px] w-96 items-center justify-center bg-mainBlack">
      <CardContent className="h-[315px]">{children}</CardContent>
    </Card>
  );
};

export default SeminarCard;
