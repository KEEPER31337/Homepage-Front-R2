import React, { useState } from 'react';
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
  const [isInvalidTitle, setIsInvalidTitle] = useState(false);

  const { mutate: editAttendStatus } = useEditAttendStatusMutation(attendanceStatus.attendanceId);

  const validate = () => {
    const isValid = excuse.trim() !== '';
    setIsInvalidTitle(!isValid);
    return isValid;
  };

  const IsExcuseRequired = () => {
    return statusType === 'ABSENCE' || statusType === 'LATENESS';
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSeminarButtonClick = () => {
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

  const handleBookInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExcuse(e.target.value);
  };

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
      onActionButonClick={handleAddSeminarButtonClick}
    >
      <div className="flex flex-col items-center space-y-5">
        <StatusTypeSelector value={statusType} setValue={setStatusType} />
        {IsExcuseRequired() && (
          <StandardInput
            className="w-52"
            error={isInvalidTitle}
            helperText={isInvalidTitle && '사유을 입력해주세요'}
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
