import React from 'react';
import { NavLink } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';

interface StandardTabProps {
  options: { id: number; label: string; url?: string }[];
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
        <Tab
          LinkComponent={NavLink}
          component={NavLink}
          key={option.id}
          className="w-[120px] !text-base"
          label={option.label}
          to={option.url || ''}
        />
      ))}
    </Tabs>
  );
};

export default StandardTab;
