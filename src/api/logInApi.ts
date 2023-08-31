import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import memberState from '@recoil/member.recoil';
import { MemberDetailInfo } from './dto';

const useLoginMutation = () => {
  const fetcher = ({ loginId, password }: { loginId: string; password: string }) =>
    axios.post(`/sign-in`, { loginId, password }).then(({ data }) => data);

  const navigate = useNavigate();
  const setMemberState = useSetRecoilState(memberState);

  return useMutation(fetcher, {
    onSuccess: ({ memberId, loginId, emailAddress, realName, thumbnailPath, memberJobs }: MemberDetailInfo) => {
      navigate('/');
      setMemberState({ memberId, loginId, emailAddress, realName, thumbnailPath, memberJobs });
    },
  });
};

export default useLoginMutation;
