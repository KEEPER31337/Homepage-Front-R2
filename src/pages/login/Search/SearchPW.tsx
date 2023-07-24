import React, { useState } from 'react';
import SearchPWFirstStep from './SearchPWFirstStep';
import SearchPWSecondStep from './SearchPWSecondStep';
import SearchPWThirdStep from './SearchPWThirdStep';

const SearchPW = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const stepInputSection: { [key: number]: JSX.Element } = {
    1: <SearchPWFirstStep setCurrentStep={setCurrentStep} />,
    2: <SearchPWSecondStep setCurrentStep={setCurrentStep} />,
    3: <SearchPWThirdStep />,
  };
  return (
    <div className="h-full w-full items-center justify-center">
      <div className="h-[480px] w-[700px] items-center justify-center">{stepInputSection[currentStep]}</div>
    </div>
  );
};

export default SearchPW;
