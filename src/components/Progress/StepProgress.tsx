import React from 'react';
import { LinearProgress } from '@mui/material';

interface StepProgress {
  currentStep: number;
  totalStep: number;
}

const StepProgress = ({ currentStep, totalStep }: StepProgress) => {
  const currentProgressRate = (100 / totalStep) * currentStep;

  return <LinearProgress className="w-32" variant="determinate" value={currentProgressRate} />;
};

export default StepProgress;
