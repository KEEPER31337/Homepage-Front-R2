import React from 'react';
import { VscCheck, VscChromeClose } from 'react-icons/vsc';
import { SeminarStatus } from '@api/dto';

interface SeminarAttendStatusProps {
  status: SeminarStatus;
  hasIcon?: boolean;
}

const SeminarAttendStatus = ({ status, hasIcon = true }: SeminarAttendStatusProps) => {
  const statusInfo: { [key in SeminarStatus]: { text: string; color: string; icon: JSX.Element | null } } = {
    ATTENDANCE: {
      text: '출석',
      color: 'pointBlue',
      icon: <VscCheck />,
    },
    LATENESS: {
      text: '지각',
      color: 'subOrange',
      icon: <VscCheck />,
    },
    ABSENCE: {
      text: '결석',
      color: 'subRed',
      icon: <VscChromeClose />,
    },
    PERSONAL: {
      text: '개인사정',
      color: 'pointBlue/70',
      icon: null,
    },
    BEFORE_ATTENDANCE: {
      text: '출석 전',
      color: 'white',
      icon: null,
    },
  };

  const { text, color, icon } = statusInfo[status];

  return hasIcon ? (
    <div className={`flex items-center justify-center text-${color}`}>
      {icon}
      <p className="ml-1">{text}</p>
    </div>
  ) : (
    <p className={`text-${color}`}>{text}</p>
  );
};

export default SeminarAttendStatus;
