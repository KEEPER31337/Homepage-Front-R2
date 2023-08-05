import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { Role } from '@api/dto';
import memberState from '@recoil/member.recoil';

const useCheckAuth = () => {
  const member = useRecoilValue(memberState);

  const checkAuth = useMemo(() => {
    return (requiredRole: Role) => member.roles.includes(requiredRole);
  }, [member]);

  const checkIncludeOneOfAuths = useMemo(() => {
    return (roles: Role[]) => roles.some((role) => checkAuth(role));
  }, [member]);

  return { checkAuth, checkIncludeOneOfAuths };
};

export default useCheckAuth;
