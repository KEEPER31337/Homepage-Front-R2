import React, { ReactNode } from 'react';
import { Card, CardContent } from '@mui/material';

interface SeminarCardProps {
  children: ReactNode;
}

const SeminarCard = ({ children }: SeminarCardProps) => {
  const seminarExist = false; // TODO: useState, api로 교체

  return (
    <Card
      className={`flex h-[390px] w-[345px] justify-center !rounded-[10px] !bg-middleBlack !bg-none ${
        seminarExist && 'opacity-50'
      }`}
    >
      <CardContent className="h-[315px]">{children}</CardContent>
    </Card>
  );
};

export default SeminarCard;
