import { useCallback } from 'react';
import { Role } from '@api/dto';
import { useMeQuery } from '@api/meApi';

const useCheckAuth = () => {
  const { data: member } = useMeQuery();

  const checkLogin = useCallback(() => {
    return Boolean(member);
  }, [member]);

  const checkAuth = useCallback(
    (requiredRole: Role) => {
      return member?.memberJobs?.includes(requiredRole);
    },
    [member],
  );

  const checkIncludeOneOfAuths = useCallback((roles: Role[]) => roles.some((role) => checkAuth(role)), [checkAuth]);

  const checkIsMyId = useCallback((id: number | null) => id !== null && member?.memberId === id, [member]);

  return { checkLogin, checkAuth, checkIncludeOneOfAuths, checkIsMyId };
};

export default useCheckAuth;
