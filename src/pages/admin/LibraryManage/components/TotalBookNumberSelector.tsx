import React from 'react';
import Selector from '@components/Selector/Selector';
import { SelectChangeEvent } from '@mui/material';

interface TotalBookNumberProps {
  value?: number;
  setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
  className?: string;
}

const TotalBookNumberSelector = ({ value, setValue, className }: TotalBookNumberProps) => {
  const bookNumberList = [
    { id: 1, content: '1권' },
    { id: 2, content: '2권' },
    { id: 3, content: '3권' },
    { id: 4, content: '4권' },
    { id: 5, content: '5권' },
    { id: 6, content: '6권' },
    { id: 7, content: '7권' },
    { id: 8, content: '8권' },
    { id: 9, content: '9권' },
    { id: 10, content: '10권' },
  ];

  const handleTotalBookNumberChange = (event: SelectChangeEvent<unknown>) => {
    setValue(Number(event.target.value as string));
  };

  return (
    <Selector className={className} options={bookNumberList} value={value} onChange={handleTotalBookNumberChange} />
  );
};

export default TotalBookNumberSelector;
