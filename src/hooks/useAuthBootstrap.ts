import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtomValue, useSetAtom } from 'jotai';
import { MemberInfo, ProfileInfo } from '@api/dto';
import memberState from '@recoil/member.recoil';
import { formatGeneration } from '@utils/converter';

// 처음 로그인 정합성 판단 훅
const useAuthBootstrap = () => {
  const member = useAtomValue(memberState);
  const setMemberState = useSetAtom(memberState);
  const [initialMember] = useState<MemberInfo | null>(() => member); // 재호출 루프 방지를 위해 새로운 state 선언

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      if (!initialMember) {
        return;
      }

      try {
        const { data } = await axios.get<ProfileInfo>(`/members/${initialMember.memberId}/profile`);

        if (isMounted) {
          setMemberState({
            memberId: data.id,
            loginId: initialMember.loginId,
            emailAddress: data.emailAddress,
            realName: data.realName,
            thumbnailPath: data.thumbnailPath,
            memberJobs: data.memberJobs,
            generation: formatGeneration(data.generation),
          });
        }
      } catch {
        if (isMounted) {
          setMemberState(null);
        }
      }
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [initialMember, setMemberState]);
};

export default useAuthBootstrap;
