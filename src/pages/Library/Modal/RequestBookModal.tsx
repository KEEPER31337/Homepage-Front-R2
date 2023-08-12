import React, { useState } from 'react';

import { Typography } from '@mui/material';
import ConfirmModal from '@components/Modal/ConfirmModal';

interface RequestBookModalProps {
  open: boolean;
  onClose: () => void;
}

const RequestBookModal = ({ open, onClose }: RequestBookModalProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [librarian, setLibrarian] = useState<string>('박소현');

  return (
    <ConfirmModal open={open} onClose={onClose} title="신청완료">
      <Typography>신청이 완료되었습니다.</Typography>
      <Typography>사서({librarian})에게 승인 요청 해주세요.</Typography>
    </ConfirmModal>
  );
};

export default RequestBookModal;
