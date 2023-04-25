import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

interface StandardTabProps {
  options: { id: number; label: string }[];
}

const StandardTab = ({ options }: StandardTabProps) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setCurrentTab(newTab);
  };

  return (
    <Box className="w-fit">
      <Tabs value={currentTab} onChange={handleChange}>
        {options.map((option) => (
          <Tab key={option.id} className="w-[120px] !text-base" label={option.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default StandardTab;
