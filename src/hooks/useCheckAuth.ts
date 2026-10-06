import { Role } from '@api/dto';
import { useMeQuery } from '@api/meApi';

const useCheckAuth = () => {
  const { data: member } = useMeQuery();

  const checkLogin = () => Boolean(member);

  const checkAuth = (requiredRole: Role) => member?.memberJobs?.includes(requiredRole);

  const checkIncludeOneOfAuths = (roles: Role[]) => roles.some((role) => checkAuth(role));

  const checkIsMyId = (id: number | null) => id !== null && member?.memberId === id;

  return { checkLogin, checkAuth, checkIncludeOneOfAuths, checkIsMyId };
};

export default useCheckAuth;
