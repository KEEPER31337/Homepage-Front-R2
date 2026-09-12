import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { cancelMe, normalizeMe, setMe } from './meApi';
import type { MemberDetailInfo } from './dto';

const useLoginMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ loginId, password }: { loginId: string; password: string }) =>
      axios.post<MemberDetailInfo>('/sign-in', { loginId, password }).then(({ data }) => data),
    onMutate: () => cancelMe(queryClient),
    onSuccess: async (member) => {
      await setMe(queryClient, normalizeMe(member));
      navigate('/');
    },
  });
};

export default useLoginMutation;
