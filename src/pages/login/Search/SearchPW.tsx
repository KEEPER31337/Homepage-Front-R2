import React, { useState } from 'react';
import SearchPWFirstStep from './SearchPWFirstStep';
import SearchPWSecondStep from './SearchPWSecondStep';
import SearchPWThirdStep from './SearchPWThirdStep';

const SearchPW = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    id: '',
    email: '',
    verificationCode: '',
  });

  const stepInputSection: { [key: number]: JSX.Element } = {
    1: <SearchPWFirstStep setCurrentStep={setCurrentStep} form={form} setForm={setForm} />,
    2: <SearchPWSecondStep setCurrentStep={setCurrentStep} firstForm={form} />,
    3: <SearchPWThirdStep />,
  };
  return <div className="px-6 sm:h-[492px] sm:w-[690px] sm:px-0">{stepInputSection[currentStep]}</div>;
};

export default SearchPW;
