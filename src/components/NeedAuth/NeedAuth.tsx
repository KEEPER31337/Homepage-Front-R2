import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Role } from '@api/dto';
import useCheckAuth from '@hooks/useCheckAuth';
import ConfirmModal from '@components/Modal/ConfirmModal';

interface NeedLoginProps {
  children: JSX.Element;
  roles?: Role[];
}

const NeedAuth = ({ children, roles = [] }: NeedLoginProps) => {
  const { checkIncludeOneOfAuths } = useCheckAuth();
  const navigate = useNavigate();

  const onClose = () => {
    navigate('/');
  };

  if (checkIncludeOneOfAuths([...roles, 'ROLE_회장', 'ROLE_부회장'])) {
    return children;
  }
  return (
    <ConfirmModal open onClose={onClose} title="권한이 필요한 서비스입니다">
      <p>접근 권한이 없습니다</p>
    </ConfirmModal>
  );
};

export default NeedAuth;
