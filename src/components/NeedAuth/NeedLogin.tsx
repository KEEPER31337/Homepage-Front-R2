import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery } from '@api/meApi';
import { Button, CircularProgress } from '@mui/material';
import ConfirmModal from '@components/Modal/ConfirmModal';

interface NeedLoginProps {
  children: React.ReactElement;
}

const NeedLogin = ({ children }: NeedLoginProps) => {
  const { data: me, isError, isFetching, refetch } = useMeQuery();
  const navigate = useNavigate();

  const onClose = () => {
    navigate('/login');
  };

  if (me) {
    return children;
  }
  if (me === undefined) {
    return (
      <output className="flex min-h-[50vh] flex-col items-center justify-center gap-4" aria-live="polite">
        {isError && !isFetching ? (
          <>
            <p>로그인 정보를 확인하지 못했습니다.</p>
            <Button onClick={() => void refetch()}>다시 시도</Button>
          </>
        ) : (
          <>
            <CircularProgress aria-label="로그인 정보 확인 중" />
            <p>로그인 정보를 확인하고 있습니다.</p>
          </>
        )}
      </output>
    );
  }
  return (
    <ConfirmModal open onClose={onClose} title="로그인이 필요한 서비스입니다">
      <p>로그인 후 이용해주세요</p>
    </ConfirmModal>
  );
};

export default NeedLogin;
