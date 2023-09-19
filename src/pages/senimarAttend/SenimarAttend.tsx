import React, { useEffect, useState } from 'react';
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
import OutlinedButton from '@components/Button/OutlinedButton';
import BossCardContent from './Card/BossCardContent';
import MemberCardContent from './Card/MemberCardContent';
import SeminarCard from './Card/SeminarCard';

const SeminarAttend = () => {
  const { data: recentlyDoneSeminarId } = useGetRecentlyDoneSeminarInfoQuery();
  const { data: twoUpcomingSeminarIds } = useGetRecentlyUpcomingSeminarInfoQuery();
  const { data: availableSeminarData } = useGetAvailableSeminarInfoQuery();
  const recentSeminarId = twoUpcomingSeminarIds && twoUpcomingSeminarIds[0]?.id;
  const futureSeminarId = twoUpcomingSeminarIds && twoUpcomingSeminarIds[1]?.id;
  const cardIdOrder = [recentlyDoneSeminarId, recentSeminarId, futureSeminarId];
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

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextButtonClick = () => {
    setCurrentCardIndex(currentCardIndex + 1);
  };

  const handlePreviousButtonClick = () => {
    setCurrentCardIndex(currentCardIndex - 1);
  };

  useEffect(() => {
    if (!localStorage.getItem('출석시도횟수')) localStorage.setItem('출석시도횟수', '0');
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex text-center md:mt-[180px] md:space-x-4 md:[&>*:nth-child(2)]:mt-[-50px]">
        {cardIdOrder.map((seminarId, index) => {
          return (
            <div className={`${index === currentCardIndex ? 'block md:flex' : 'hidden md:flex'}`}>
              <SeminarCard key={seminarId}>
                {seminarId !== undefined ? (
                  <div>
                    {isStarterMember() ? (
                      <BossCardContent seminarId={seminarId} />
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
            </div>
          );
        })}
      </div>
      <div className="flex w-[345px] justify-between md:hidden">
        <OutlinedButton onClick={handlePreviousButtonClick} disabled={currentCardIndex === 0}>
          이전
        </OutlinedButton>
        <OutlinedButton onClick={handleNextButtonClick} disabled={currentCardIndex === cardIdOrder.length - 1}>
          다음
        </OutlinedButton>
      </div>
    </div>
  );
};

export default SeminarAttend;
