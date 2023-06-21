import React from 'react';
import { Stack, Typography } from '@mui/material';
import OutlinedButton from '@components/Button/OutlinedButton';
import ConfirmModal from './ConfirmModal';

interface MailAuthenticationModalProps {
  open: boolean;
  onClose: () => void;
}

const MailAuthenticationModal = ({ open, onClose }: MailAuthenticationModalProps) => {
  const modalContents =
    '이메일 주소가 정확한지 확인해 주세요.\n메일 서비스에 따라 인증 메일 발송이 늦어질 수 있습니다.';

  return (
    <ConfirmModal open={open} onClose={onClose} title="인증 메일이 오지 않았나요?">
      <Typography className="h-24 w-[440px] whitespace-pre">{modalContents}</Typography>
      <Stack className="flex justify-end space-x-2" direction="row">
        <OutlinedButton>다른 이메일로 인증</OutlinedButton>
        <OutlinedButton>인증 메일 재발송</OutlinedButton>
      </Stack>
    </ConfirmModal>
  );
};

export default MailAuthenticationModal;
