import React, { useState } from 'react';

import { Box, Stack, Tab, Tabs } from '@mui/material';
import SearchID from './Search/SearchID';
import SearchPW from './Search/SearchPW';

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const stepInputSection: { [key: number]: JSX.Element } = {
    0: <SearchID />,
    1: <SearchPW />,
  };
  const searchList = [
    { id: 0, label: '아이디 찾기' },
    { id: 1, label: '비밀번호 찾기' },
  ];
  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setCurrentStep(newTab);
  };
  return (
    <div className="grid h-screen place-content-center place-items-center">
      <Stack className="relative h-full w-full">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentStep} onChange={handleChange}>
            {searchList.map((item) => (
              <Tab key={item.id} className="w-[50%] !text-base" label={item.label} />
            ))}
          </Tabs>
        </Box>
        {stepInputSection[currentStep]}
      </Stack>
    </div>
  );
};

export default SignUp;
