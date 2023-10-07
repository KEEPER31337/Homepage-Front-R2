import React, { useState, useEffect } from 'react';
import { AttendanceStatus } from '@api/dto';
import { useEditAttendStatusMutation } from '@api/seminarApi';
import StatusTypeSelector from '@pages/admin/SeminarManage/Selector/StatusTypeSelector';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';

interface AddSeminarModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  attendanceStatus: AttendanceStatus;
}

const EditSeminarAttendanceModal = ({ open, setOpen, attendanceStatus }: AddSeminarModalProps) => {
  const [statusType, setStatusType] = useState(attendanceStatus.attendanceStatus);
  const [excuse, setExcuse] = useState('');
  const [isInvalidExcuse, setIsInvalidExcuse] = useState(false);

  const { mutate: editAttendStatus } = useEditAttendStatusMutation(attendanceStatus.attendanceId);

  const validate = () => {
    const isValid = excuse.trim() !== '';
    setIsInvalidExcuse(!isValid);
    return isValid;
  };

  const isExcuseRequired = () => {
    return statusType === 'ABSENCE' || statusType === 'LATENESS';
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBookInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExcuse(e.target.value);
  };

  const handleEditSeminarButtonClick = () => {
    if (validate()) {
      editAttendStatus(
        { statusType, excuse: excuse.trim() },
        {
          onSuccess: () => {
            handleClose();
            setExcuse('');
          },
        },
      );
    }
  };

  useEffect(() => {
    if (attendanceStatus) {
      setStatusType(attendanceStatus.attendanceStatus);
      setExcuse(attendanceStatus.excuse || '');
    }
  }, [attendanceStatus]);

  return (
    <ActionModal
      open={open}
      onClose={() => {
        handleClose();
      }}
      title={`${attendanceStatus.attendDate.substring(5).replaceAll('-', '.')} ${
        attendanceStatus.memberName
      } 출석 상태 변경`}
      actionButtonName="변경"
      onActionButonClick={handleEditSeminarButtonClick}
    >
      <div className="flex flex-col items-center space-y-5">
        <StatusTypeSelector value={statusType} setValue={setStatusType} />
        {isExcuseRequired() && (
          <StandardInput
            className="w-52"
            error={isInvalidExcuse}
            helperText={isInvalidExcuse && '사유을 입력해주세요.'}
            label="사유"
            value={excuse}
            onChange={handleBookInfoChange}
          />
        )}
      </div>
    </ActionModal>
  );
};

export default EditSeminarAttendanceModal;