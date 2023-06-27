import React from 'react';
import { Tabs, Tab } from '@mui/material';

interface StandardTabProps {
  options: { id: number; label: string }[];
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}

const StandardTab = ({ options, tab, setTab }: StandardTabProps) => {
  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  return (
    <Tabs value={tab} onChange={handleChange}>
      {options.map((option) => (
        <Tab key={option.id} className="w-[120px] !text-base" label={option.label} />
      ))}
    </Tabs>
  );
};

export default StandardTab;
