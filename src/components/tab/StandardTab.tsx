import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

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
    <Box className="w-fit">
      <Tabs value={tab} onChange={handleChange}>
        {options.map((option) => (
          <Tab key={option.id} className="w-[120px] !text-base" label={option.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default StandardTab;
