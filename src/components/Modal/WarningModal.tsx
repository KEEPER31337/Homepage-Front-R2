import React from 'react';
import { VscWarning } from 'react-icons/vsc';

import ActionModal from './ActionModal';

interface WarningModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  actionButtonName: string;
  onActionButonClick: () => void;
}

const WarningModal = ({ open, onClose, children, actionButtonName, onActionButonClick }: WarningModalProps) => {
  return (
    <ActionModal
      modalWidth="xs"
      open={open}
      onClose={onClose}
      title="주의"
      startAdornment={<VscWarning size={24} />}
      actionButtonName={actionButtonName}
      onActionButonClick={onActionButonClick}
    >
      {children}
    </ActionModal>
  );
};

export default WarningModal;
