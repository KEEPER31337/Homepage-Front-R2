import { matchQuery, useMutation, useQueryClient, type QueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { cancelMe, meKey } from './meApi';

const clearAuthSession = async (client: QueryClient) => {
  await client.cancelQueries();

  // localStorage는 쿼리 구독에 의해서 자동으로 비워짐.
  client.setQueryData(meKey, null);
  client.removeQueries({ predicate: (query) => !matchQuery({ queryKey: meKey, exact: true }, query) });
};

const useSignOutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axios.post('/sign-out'),
    meta: { skipGlobalErrorHandler: true },
    onMutate: () => cancelMe(queryClient),
    onSuccess: async () => {
      await clearAuthSession(queryClient);
      navigate('/');
    },
    onError: () => {
      toast.error('로그아웃에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

export { clearAuthSession, useSignOutMutation };
