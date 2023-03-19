import React from 'react';
import { LinearProgress } from '@mui/material';

interface StepProgress {
  className?: string;
  currentStep: number;
  totalStep: number;
}

const StepProgress = ({ className, currentStep, totalStep }: StepProgress) => {
  const currentProgressRate = (100 / totalStep) * currentStep;

  return <LinearProgress className={className} variant="determinate" value={currentProgressRate} />;
};

export default StepProgress;
