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
    onError: () => {
      alert('아이디 또는 비밀번호를 확인해주세요.');
    },
    onSuccess: ({ id, emailAddress, realName, thumbnailPath, memberJobs }: MemberDetailInfo) => {
      navigate('/');
      setMemberState({ id, emailAddress, realName, thumbnailPath, memberJobs });
    },
  });
};

export default useLoginMutation;
