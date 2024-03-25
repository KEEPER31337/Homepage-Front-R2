import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCheckAuth from '@hooks/useCheckAuth';

interface NeedLoginProps {
  children: JSX.Element;
}

const NeedLogin = ({ children }: NeedLoginProps) => {
  const { checkLogin } = useCheckAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkLogin()) {
      navigate('/login');
    }
  }, [checkLogin()]);

  if (checkLogin()) {
    return children;
  }
  return null;
};

export default NeedLogin;
