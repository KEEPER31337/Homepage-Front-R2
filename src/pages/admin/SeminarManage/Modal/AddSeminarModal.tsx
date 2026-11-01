import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { useAddSeminarMutation } from '@api/seminarApi';
import StandardDatePicker from '@components/DatePicker/StandardDatePicker';
import ActionModal from '@components/Modal/ActionModal';

interface AddSeminarModalProps {
  open: boolean;
  onClose: () => void;
}

const AddSeminarModal = ({ open, onClose }: AddSeminarModalProps) => {
  const [seminarDate, setSeminarDate] = useState<DateTime>(DateTime.now());
  const [helperText, setHelperText] = useState('');

  const { mutate: addSeminar } = useAddSeminarMutation({ setHelperText });

  const handleAddSeminarButtonClick = () => {
    addSeminar(seminarDate, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleDateChange = (newValue: DateTime | null) => {
    if (newValue) {
      setSeminarDate(newValue);
      setHelperText('');
    }
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="세미나 추가"
      actionButtonName="추가"
      onActionButonClick={handleAddSeminarButtonClick}
    >
      <div className="flex justify-center">
        <StandardDatePicker
          value={seminarDate}
          onChange={handleDateChange}
          label="날짜"
          helperText={helperText}
          error={!!helperText}
        />
      </div>
    </ActionModal>
  );
};

export default AddSeminarModal;
