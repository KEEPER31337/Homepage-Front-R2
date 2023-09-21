import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { MemberInfo } from '@api/dto';
import {
  useGetAvailableSeminarInfoQuery,
  useGetRecentlyDoneSeminarInfoQuery,
  useGetRecentlyUpcomingSeminarInfoQuery,
} from '@api/seminarApi';
import useCheckAuth from '@hooks/useCheckAuth';
import memberState from '@recoil/member.recoil';
import starterState from '@recoil/seminarStarter.recoil';
import BossCardContent from './Card/BossCardContent';
import MemberCardContent from './Card/MemberCardContent';
import SeminarCard from './Card/SeminarCard';

const SeminarAttend = () => {
  const { data: recentlyDoneSeminarId } = useGetRecentlyDoneSeminarInfoQuery();
  const { data: twoUpcomingSeminarIds } = useGetRecentlyUpcomingSeminarInfoQuery();
  const { data: availableSeminarData } = useGetAvailableSeminarInfoQuery();
  const recentSeminarId = twoUpcomingSeminarIds && twoUpcomingSeminarIds[0]?.id;
  const futureSeminarId = twoUpcomingSeminarIds && twoUpcomingSeminarIds[1]?.id;
  const cardIdOrder = [recentlyDoneSeminarId || -3, recentSeminarId || -2, futureSeminarId || -1];
  const { checkIncludeOneOfAuths } = useCheckAuth();
  const authorizedMember = checkIncludeOneOfAuths(['ROLE_회장', 'ROLE_부회장', 'ROLE_서기']);
  const startMember: number | undefined = useRecoilValue(starterState);
  const member: MemberInfo | null = useRecoilValue(memberState);

  const isStarterMember = () => {
    if (!availableSeminarData?.id) {
      return authorizedMember;
    }
    if (authorizedMember && member?.memberId === startMember) {
      return true;
    }
    return false;
  };
  console.log(cardIdOrder);

  useEffect(() => {
    if (!localStorage.getItem('출석시도횟수')) localStorage.setItem('출석시도횟수', '0');
  }, []);

  return (
    <div className="mt-[180px] flex justify-between text-center [&>*:nth-child(2)]:mt-[-50px]">
      {cardIdOrder.map((id) => {
        return (
          <SeminarCard key={id}>
            {id > 0 ? (
              <div>{isStarterMember() ? <BossCardContent seminarId={id} /> : <MemberCardContent seminarId={id} />}</div>
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
