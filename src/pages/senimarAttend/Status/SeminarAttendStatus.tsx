import React from 'react';
import { VscCheck, VscChromeClose } from 'react-icons/vsc';

type SeminarStatus = 'ATTENDANCE' | 'LATENESS' | 'ABSENCE';

interface SeminarAttendStatusProps {
  status: SeminarStatus;
}

const SeminarAttendStatus = ({ status }: SeminarAttendStatusProps) => {
  const statusInfo: { [key in SeminarStatus]: { text: string; color: string; icon: JSX.Element } } = {
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
  };

  const { text, color, icon } = statusInfo[status];

  return (
    <div className={`flex items-center justify-center text-${color}`}>
      {icon}
      <p className="ml-1">{text}</p>
    </div>
  );
};

export default SeminarAttendStatus;
