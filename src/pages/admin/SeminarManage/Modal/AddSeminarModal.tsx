import React, { useState } from 'react';
import ActionModal from '@components/Modal/ActionModal';
import StandardDatePicker from '@components/DatePicker/StandardDatePicker';
import { DateTime } from 'luxon';

interface AddSeminarModalProps {
  open: boolean;
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSeminarModal = ({ open, toggleOpen }: AddSeminarModalProps) => {
  const [date, setDate] = useState<DateTime | null>(null);
  const handleClose = () => {
    toggleOpen(false);
    setDate(null);
  };
  const handleSeminarAddButtonClick = () => {
    toggleOpen(true);
    // TODO
    setDate(null);
  };

  return (
    <div>
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
    </div>
  );
};

export default AddSeminarModal;
