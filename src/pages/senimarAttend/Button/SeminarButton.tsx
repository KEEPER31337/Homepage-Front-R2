import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';

const buttonStyle = {
  borderRadius: '2px',
  backgroundColor: '#4CEEF9',
  width: '71px',
  height: '34px',
  fontSize: '10px',
  fontWeight: '600',
  color: '#26262c',
  margin: '0 0 19px 0',
  fontFamily: 'IBM Plex Sans KR',
};

interface SeminarButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const SeminarButton = ({ children, onClick }: SeminarButtonProps) => {
  return (
    <div className="flex justify-center">
      <Button style={buttonStyle} variant="contained" onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};
export default SeminarButton;
