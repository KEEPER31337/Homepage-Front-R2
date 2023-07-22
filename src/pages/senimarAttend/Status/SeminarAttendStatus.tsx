import React from 'react';
import { VscCheck, VscChromeClose } from 'react-icons/vsc';
import ActivityStatus from '../SeminarAttend.interface';

interface SeminarAttendStatusProps {
  status: ActivityStatus;
}

const SeminarAttendStatus = ({ status }: SeminarAttendStatusProps) => {
  const statusInfo: { [key in ActivityStatus]: { text: string; color: string; icon: JSX.Element } } = {
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
    ABSENT: {
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
