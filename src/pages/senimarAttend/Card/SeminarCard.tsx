import React, { ReactNode, useState } from 'react';
import { Card, CardContent } from '@mui/material';

interface SeminarCardProps {
  children: ReactNode;
}

const SeminarCard = ({ children }: SeminarCardProps) => {
  const [seminarExist, setSeminarExist] = useState(false); // TODO: api로 교체

  return (
    <Card
      className={`flex h-[426px] w-96 items-center justify-center !bg-middleBlack !bg-none ${
        seminarExist ? 'opacity-50' : ''
      }`}
    >
      <CardContent className="h-[315px]">{children}</CardContent>
    </Card>
  );
};

export default SeminarCard;
