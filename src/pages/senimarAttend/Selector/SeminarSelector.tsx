import React, { ReactNode } from 'react';
import Selector from '@components/Selector/Selector';
import { SelectChangeEvent } from '@mui/material';

interface SeminarSelectorProps {
  limitValue?: number;
  setLimitValue: React.Dispatch<React.SetStateAction<number>>;
  children?: ReactNode;
}

const SeminarSelector = ({ limitValue, setLimitValue, children }: SeminarSelectorProps) => {
  const timeLimitlist = [
    { id: 5, content: '5분' },
    { id: 10, content: '10분' },
    { id: 15, content: '15분' },
  ];

  const handleTimeLimitChange = (event: SelectChangeEvent<unknown>) => {
    setLimitValue(Number(event.target.value as string));
  };

  return (
    <div className=" mx-auto flex h-[24px] items-end justify-center whitespace-nowrap">
      <p className="mr-[25px] mb-[5px] font-semibold">{children}</p>
      <Selector
        className="flex w-[92px] text-center"
        label=""
        value={limitValue}
        onChange={handleTimeLimitChange}
        options={timeLimitlist}
      />
    </div>
  );
};

export default SeminarSelector;
