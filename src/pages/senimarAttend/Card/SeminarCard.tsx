import React, { ReactNode } from 'react';
import { Card, CardContent } from '@mui/material';

interface SeminarCardProps {
  children: ReactNode;
}

const SeminarCard = ({ children }: SeminarCardProps) => {
  const IsSeminarStart = false; // TODO: useState, api로 교체

  return (
    <Card
      className={`flex h-[406px] w-[385px] items-center justify-center !bg-middleBlack !bg-none ${
        IsSeminarStart && 'opacity-50'
      }`}
    >
      <CardContent className="h-[315px]">{children}</CardContent>
    </Card>
  );
};

export default SeminarCard;
