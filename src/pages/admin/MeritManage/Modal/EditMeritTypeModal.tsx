import React, { useState } from 'react';
import ActionModal from '@components/Modal/ActionModal';

interface EditMeritTypeModalProps {
  open: boolean;
  onClose: () => void;
}

const EditMeritTypeModal = ({ open, onClose }: EditMeritTypeModalProps) => {
  const [meritInfo, setMeritInfo] = useState({
    awarder: null,
    meritType: null,
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

export default EditMeritTypeModal;
