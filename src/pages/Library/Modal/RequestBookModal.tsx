import React, { useEffect } from 'react';

import { Typography } from '@mui/material';
import ConfirmModal from '@components/Modal/ConfirmModal';

interface RequestBookModalProps {
  librarian: string;
  selectedBookId: number;
  open: boolean;
  onClose: () => void;
}

const RequestBookModal = ({ librarian, selectedBookId, open, onClose }: RequestBookModalProps) => {
  useEffect(() => {
    // TODO: 신청 api
  }, [selectedBookId]);

  return (
    <ConfirmModal open={open} onClose={onClose} title="신청완료">
      <Typography>신청이 완료되었습니다.</Typography>
      <Typography>사서({librarian})에게 승인 요청 해주세요.</Typography>
    </ConfirmModal>
  );
};

export default RequestBookModal;
