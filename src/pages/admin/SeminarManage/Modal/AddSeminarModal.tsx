import React, { useState } from 'react';
import ActionModal from '@components/Modal/ActionModal';
import StandardDatePicker from '@components/DatePicker/StandardDatePicker';
import { DateTime } from 'luxon';

interface AddSeminarModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSeminarModal = ({ open, setOpen }: AddSeminarModalProps) => {
  const [date, setDate] = useState<DateTime | null>(null);
  const handleClose = () => {
    setOpen(false);
    setDate(null);
  };

  const handleSeminarAddButtonClick = () => {
    // TODO
    setDate(null);
  };

  return (
    <ActionModal
      open={open}
      onClose={handleClose}
      title="세미나 일정 추가"
      actionButtonName="추가"
      onActionButonClick={handleSeminarAddButtonClick}
    >
      <div className="flex justify-center">
        <StandardDatePicker date={date} setDate={setDate} label="날짜" />
      </div>
    </ActionModal>
  );
};

export default AddSeminarModal;
