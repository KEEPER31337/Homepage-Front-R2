import React, { ReactNode } from 'react';
import { Card, CardContent } from '@mui/material';

interface SeminarCardProps {
  children: ReactNode;
  className?: string;
}

const SeminarCard = ({ children, className }: SeminarCardProps) => {
  const seminarExist = false; // TODO: useState, api로 교체

  return (
    <Card
      className={`flex h-[426px] w-96 items-center justify-center !bg-middleBlack !bg-none ${
        seminarExist && 'opacity-50'
      } ${className}`}
    >
      <CardContent className="h-[315px]">{children}</CardContent>
    </Card>
  );
};

export default SeminarCard;
