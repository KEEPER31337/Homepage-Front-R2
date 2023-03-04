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
  ];

  const handleTotalBookNumberChange = (event: SelectChangeEvent<unknown>) => {
    setValue(Number(event.target.value as string));
  };

  return (
    <Selector
      className={className}
      label="권수"
      options={bookNumberList}
      value={value}
      onChange={handleTotalBookNumberChange}
    />
  );
};

export default TotalBookNumberSelector;
