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
    <div className="mt-2 h-screen w-full place-content-center place-items-center sm:mt-0 sm:grid ">
      <Stack textAlign="center">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentStep} onChange={handleChange}>
            {searchList.map((item) => (
              <Tab key={item.id} className="w-1/2" label={item.label} />
            ))}
          </Tabs>
        </Box>
        {stepInputSection[currentStep]}
      </Stack>
    </div>
  );
};

export default SignUp;
