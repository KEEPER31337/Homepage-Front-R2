import React from 'react';
import { SelectChangeEvent } from '@mui/material';
import { SeminarStatus } from '@api/dto';
import Selector from '@components/Selector/Selector';

interface StatusTypeSelectorProps {
  value: SeminarStatus;
  setValue: React.Dispatch<React.SetStateAction<SeminarStatus>>;
}

const StatusTypeSelector = ({ value, setValue }: StatusTypeSelectorProps) => {
  const seminarStatusList = [
    { id: 'ATTENDANCE', content: '출석' },
    { id: 'ABSENCE', content: '결석' },
    { id: 'LATENESS', content: '지각' },
    { id: 'PERSONAL', content: '개인사정' },
    { id: 'BEFORE_ATTENDANCE', content: '출석 전' },
  ];

  const handleSeminarStatusChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value as SeminarStatus);
  };

  return (
    <Selector
      label="상태"
      className="w-52"
      options={seminarStatusList}
      value={value}
      onChange={handleSeminarStatusChange}
    />
  );
};

export default StatusTypeSelector;
