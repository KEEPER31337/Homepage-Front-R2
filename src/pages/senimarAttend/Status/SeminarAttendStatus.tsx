import React from 'react';
import { VscCheck, VscChromeClose } from 'react-icons/vsc';

interface AttendStatuesProps {
  status: string;
  className: string;
}

const SeminarAttendStatus = ({ status, className }: AttendStatuesProps) => {
  const attendStatusAlert = (
    <div className={`${className} text-pointBlue`}>
      <VscCheck />
      <p className="ml-1">출석</p>
    </div>
  );
  const lateStatusAlert = (
    <div className={`${className} text-[#FFA500]`}>
      <VscCheck />
      <p className="ml-1">지각</p>
    </div>
  );
  const absentStatusAlert = (
    <div className={`${className} text-red-500`}>
      <VscChromeClose />
      <p className="ml-1 ">결석</p>
    </div>
  );
  const setAlert: { [id: string]: JSX.Element } = {
    출석전: <div />,
    지각: lateStatusAlert,
    출석: attendStatusAlert,
    결석: absentStatusAlert,
  };

  return setAlert[status];
};

export default SeminarAttendStatus;
