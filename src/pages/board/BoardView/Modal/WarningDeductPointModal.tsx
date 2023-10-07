import React from 'react';
import WarningModal from '@components/Modal/WarningModal';

interface WarningDeductPointModalProps {
  open: boolean;
  onClose: () => void;
  onActionButonClick: () => void;
}

const DEDUCT_POINT = 10000;

const WarningDeductPointModal = ({ open, onClose, onActionButonClick }: WarningDeductPointModalProps) => {
  return (
    <WarningModal open={open} onClose={onClose} actionButtonName="열람" onActionButonClick={onActionButonClick}>
      시험 게시판은 첨부파일 열람 시 <strong>{DEDUCT_POINT}</strong> 포인트가 차감됩니다. 열람 하시겠습니까?
    </WarningModal>
  );
};

export default WarningDeductPointModal;
