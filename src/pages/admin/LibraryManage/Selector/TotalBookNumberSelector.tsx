import React from 'react';
import { SelectChangeEvent } from '@mui/material';
import Selector from '@components/Selector/Selector';

interface TotalBookNumberProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const TotalBookNumberSelector = ({ value, setValue }: TotalBookNumberProps) => {
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

  return <Selector options={bookNumberList} value={value} onChange={handleTotalBookNumberChange} />;
};

export default TotalBookNumberSelector;
