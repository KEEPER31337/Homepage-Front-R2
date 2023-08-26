import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import {
  useGetAvailableSeminarInfoQuery,
  useGetRecentlyDoneSeminarInfoQuery,
  useGetRecentlyUpcomingSeminarInfoQuery,
} from '@api/seminarApi';
import useCheckAuth from '@hooks/useCheckAuth';
import { useRecoilValue } from 'recoil';
import memberState from '@recoil/member.recoil';
import { MemberInfo } from '@api/dto';
import SeminarCard from './Card/SeminarCard';
import BossCardContent from './Card/BossCardContent';
import MemberCardContent from './Card/MemberCardContent';

const SeminarAttend = () => {
  const { data: recentlyDoneSeminarId } = useGetRecentlyDoneSeminarInfoQuery();
  const { data: twoUpcomingSeminarIds } = useGetRecentlyUpcomingSeminarInfoQuery();
  const recentSeminarId = twoUpcomingSeminarIds && twoUpcomingSeminarIds[0]?.id;
  const futureSeminarId = twoUpcomingSeminarIds && twoUpcomingSeminarIds[1]?.id;
  const cardIdOrder = [recentlyDoneSeminarId, recentSeminarId, futureSeminarId];
  const { checkIncludeOneOfAuths } = useCheckAuth();
  const { data: availableSeminarData } = useGetAvailableSeminarInfoQuery();
  const authorizedMember = checkIncludeOneOfAuths(['ROLE_회장', 'ROLE_부회장', 'ROLE_서기']);
  const [startMember, setStartMember] = useState<MemberInfo | null>();
  const member: MemberInfo | null = useRecoilValue(memberState);

  const isStarterMember = () => {
    if (!availableSeminarData?.id) {
      return authorizedMember;
    }
    if (member === startMember) {
      return true;
    }
    return false;
  };

  console.log(authorizedMember);

  useEffect(() => {
    if (!localStorage.getItem('출석시도횟수')) localStorage.setItem('출석시도횟수', '0');
  }, []);

  return (
    <div className="mt-[180px] flex justify-between text-center [&>*:nth-child(2)]:mt-[-50px]">
      {cardIdOrder.map((seminarId) => {
        return (
          <SeminarCard key={seminarId}>
            {seminarId !== undefined ? (
              <div>
                {isStarterMember() ? (
                  <BossCardContent seminarId={seminarId} setStartMember={setStartMember} />
                ) : (
                  <MemberCardContent seminarId={seminarId} />
                )}
              </div>
            ) : (
              <Typography className="!mt-[16px] text-center !text-h3 !font-bold text-pointBlue opacity-50">
                예정된 세미나가 없습니다.
              </Typography>
            )}
          </SeminarCard>
        );
      })}
    </div>
  );
};

export default SeminarAttend;
