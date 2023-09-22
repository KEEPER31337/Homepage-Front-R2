import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { useAddSeminarMutation } from '@api/seminarApi';
import StandardDatePicker from '@components/DatePicker/StandardDatePicker';
import ActionModal from '@components/Modal/ActionModal';

interface AddSeminarModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSeminarModal = ({ open, setOpen }: AddSeminarModalProps) => {
  const [seminarDate, setSeminarDate] = useState(DateTime.now());

  const { mutate: addSeminar } = useAddSeminarMutation();

  const handleClose = () => {
    setOpen(false);
    setSeminarDate(DateTime.now());
  };

  const handleAddSeminarButtonClick = () => {
    addSeminar(seminarDate, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  const handleDateChange = (newValue: DateTime | null) => {
    if (newValue) setSeminarDate(newValue);
  };

  return (
    <ActionModal
      open={open}
      onClose={() => {
        handleClose();
      }}
      title="세미나 추가"
      actionButtonName="추가"
      onActionButonClick={handleAddSeminarButtonClick}
    >
      <div className="flex justify-center">
        <StandardDatePicker value={seminarDate} onChange={handleDateChange} label="날짜" />
      </div>
    </ActionModal>
  );
};

export default AddSeminarModal;
