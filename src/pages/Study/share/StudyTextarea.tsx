import React from 'react';
import { TextField } from '@mui/material';

/**
 * TODO 공통 컴포넌트 제작 후 삭제 예정
 */

interface TextareaProps {
  variant: 'standard' | 'outlined' | 'filled' | undefined;
  label: string;
  placeholder: string;
}

const StudyTextarea = ({ variant, label, placeholder }: TextareaProps) => {
  return <TextField multiline rows={4} variant={variant} label={label} placeholder={placeholder} />;
};

export default StudyTextarea;
