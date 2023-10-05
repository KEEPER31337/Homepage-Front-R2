import React from 'react';
import { useDeleteMeritLogMutation } from '@api/meritApi';
import ActionModal from '@components/Modal/ActionModal';

interface DeleteMeritLogModalProps {
  open: boolean;
  onClose: () => void;
  meritLogId: number;
}

const DeleteMeritLogModal = ({ open, onClose, meritLogId }: DeleteMeritLogModalProps) => {
  const { mutate: deleteMeritLog } = useDeleteMeritLogMutation();

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="상벌점 내역 삭제"
      modalWidth="xs"
      actionButtonName="삭제"
      onActionButonClick={() => {
        deleteMeritLog(
          { meritLogId },
          {
            onSuccess: () => {
              onClose();
            },
          },
        );
      }}
    >
      해당 상벌점 내역을 삭제하시겠습니까?
    </ActionModal>
  );
};

export default DeleteMeritLogModal;
