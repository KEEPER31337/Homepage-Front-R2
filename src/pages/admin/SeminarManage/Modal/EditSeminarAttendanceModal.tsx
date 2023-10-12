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
  const [excuse, setExcuse] = useState(attendanceStatus.excuse || '');
  const [isValidExcuse, setIsValidExcuse] = useState(false);

  const { mutate: editAttendStatus } = useEditAttendStatusMutation(attendanceStatus.attendanceId);

  const isExcuseRequired = () => {
    return statusType === 'PERSONAL' || statusType === 'LATENESS';
  };

  const validate = () => {
    let isValid = true;
    if (isExcuseRequired()) {
      isValid = excuse.trim() !== '';
    }

    setIsValidExcuse(isValid);
    return isValid;
  };

  const resetExcuse = () => {
    setExcuse('');
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
        <StatusTypeSelector value={statusType} setValue={setStatusType} resetExcuse={resetExcuse} />
        {isExcuseRequired() && (
          <StandardInput
            className="w-52"
            error={!isValidExcuse}
            helperText={!isValidExcuse && '사유을 입력해주세요.'}
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
