import React from 'react';
import { SelectChangeEvent } from '@mui/material';
import Selector from '@components/Selector/Selector';

interface TotalBookNumberProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const TotalBookNumberSelector = ({ value, setValue }: TotalBookNumberProps) => {
  const bookNumberList = Array.from({ length: 20 }, (_, index) => ({ id: index + 1, content: `${index + 1}권` }));

  const handleTotalBookNumberChange = (event: SelectChangeEvent<unknown>) => {
    setValue(Number(event.target.value as string));
  };

  return <Selector options={bookNumberList} value={value} onChange={handleTotalBookNumberChange} />;
};

export default TotalBookNumberSelector;
