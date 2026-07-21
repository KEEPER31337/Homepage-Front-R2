import { useCallback } from 'react';
import { useAtomValue } from 'jotai';
import { MemberInfo, Role } from '@api/dto';
import memberState from '@recoil/member.recoil';

const useCheckAuth = () => {
  const member: MemberInfo | null = useAtomValue(memberState);

  const checkLogin = useCallback(() => {
    return member !== null;
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
