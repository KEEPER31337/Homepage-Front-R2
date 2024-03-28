import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCheckAuth from '@hooks/useCheckAuth';
import ConfirmModal from '@components/Modal/ConfirmModal';

interface NeedLoginProps {
  children: JSX.Element;
}

const NeedLogin = ({ children }: NeedLoginProps) => {
  const { checkLogin } = useCheckAuth();
  const navigate = useNavigate();

  const onClose = () => {
    navigate('/login');
  };

  if (checkLogin()) {
    return children;
  }
  return (
    <ConfirmModal open onClose={onClose} title="로그인이 필요한 서비스입니다">
      <p>로그인 후 이용해주세요</p>
    </ConfirmModal>
  );
};

export default NeedLogin;
