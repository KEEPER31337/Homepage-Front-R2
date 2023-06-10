import React from 'react';
import { VscCheck, VscChromeClose } from 'react-icons/vsc';

type ActivityStatus = '지각' | '출석' | '결석';

interface SeminarAttendStatusProps {
  status: ActivityStatus;
}

const SeminarAttendStatus = ({ status }: SeminarAttendStatusProps) => {
  const statusInfo: {
    [K in ActivityStatus]: { color: string; icon: JSX.Element };
  } = {
    출석: {
      color: 'pointBlue',
      icon: <VscCheck />,
    },
    지각: {
      color: '[#FFA500]',
      icon: <VscCheck />,
    },
    결석: {
      color: 'subRed',
      icon: <VscChromeClose />,
    },
  };

  const { color, icon } = statusInfo[status];

  return (
    <div className={`flex items-center justify-center text-${color}`}>
      {icon}
      <p className="ml-1">{status}</p>
    </div>
  );
};

export default SeminarAttendStatus;
