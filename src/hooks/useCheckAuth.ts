import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { MemberInfo, Role } from '@api/dto';
import memberState from '@recoil/member.recoil';

const useCheckAuth = () => {
  const member: MemberInfo | null = useRecoilValue(memberState);

  const checkAuth = useMemo(() => {
    return (requiredRole: Role) => member?.memberJobs?.includes(requiredRole);
  }, [member]);

  const checkIncludeOneOfAuths = useMemo(() => {
    return (roles: Role[]) => roles.some((role) => checkAuth(role));
  }, [member]);

  const checkIsMyId = (id: number) => member?.memberId === id;

  return { checkAuth, checkIncludeOneOfAuths, checkIsMyId };
};

export default useCheckAuth;
