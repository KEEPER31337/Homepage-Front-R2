import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Role } from '@api/dto';
import useCheckAuth from '@hooks/useCheckAuth';

interface NeedLoginProps {
  children: JSX.Element;
  roles: Role[];
}

const NeedAuth = ({ children, roles }: NeedLoginProps) => {
  const { checkIncludeOneOfAuths } = useCheckAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkIncludeOneOfAuths(roles)) {
      navigate('/');
    }
  }, [checkIncludeOneOfAuths(roles)]);

  if (checkIncludeOneOfAuths(roles)) {
    return children;
  }
  return null;
};

export default NeedAuth;
