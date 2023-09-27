import React from 'react';
import { Stack, Typography } from '@mui/material';
import OutlinedButton from '@components/Button/OutlinedButton';
import ConfirmModal from './ConfirmModal';

interface MailAuthenticationModalProps {
  open: boolean;
  onClose: () => void;
  onOtherEmailButtonClick: () => void;
  onResendMailButtonClick: () => void;
}

const MailAuthenticationModal = ({
  open,
  onClose,
  onOtherEmailButtonClick,
  onResendMailButtonClick,
}: MailAuthenticationModalProps) => {
  const modalContents =
    '이메일 주소가 정확한지 확인해 주세요.\n메일 서비스에 따라 인증 메일 발송이 늦어질 수 있습니다.';

  return (
    <ConfirmModal open={open} onClose={onClose} title="인증 메일이 오지 않았나요?">
      <Typography className="whitespace-pre-line">{modalContents}</Typography>
      <Stack spacing={1} marginTop={4} direction="row" justifyContent="end">
        <OutlinedButton small onClick={onOtherEmailButtonClick}>
          다른 이메일로 인증
        </OutlinedButton>
        <OutlinedButton small onClick={onResendMailButtonClick}>
          인증 메일 재발송
        </OutlinedButton>
      </Stack>
    </ConfirmModal>
  );
};

export default MailAuthenticationModal;
