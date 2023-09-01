import React, { useState } from 'react';
import ActionModal from '@components/Modal/ActionModal';

interface AddMeritModalProps {
  open: boolean;
  onClose: () => void;
}

const AddMeritModal = ({ open, onClose }: AddMeritModalProps) => {
  const [rewordInfo, setRewordInfo] = useState({
    awarder: null,
    rewordPenaltyType: null,
  });

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="상벌점 부여"
      modalWidth="xs"
      actionButtonName="추가"
      onActionButonClick={() => {
        console.log('click');
      }}
    >
      <div className="flex space-x-6">
        <div className="relative grow space-y-5" />
      </div>
    </ActionModal>
  );
};

export default AddMeritModal;
