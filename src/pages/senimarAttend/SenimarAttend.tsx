import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
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
  const [visibleSeminars, setVisibleSeminars] = useState<{ order: number; id?: number }[]>([
    { order: 1 },
    { order: 2 },
    { order: 3 },
  ]);

  const { data: recentlyDoneSeminarId, isSuccess: isGetRecentlyDoneSeminarIdSuccess } =
    useGetRecentlyDoneSeminarInfoQuery();
  const { data: twoUpcomingSeminarIds, isSuccess: isGetRecentlyUpcomingSeminarIdsSuccess } =
    useGetRecentlyUpcomingSeminarInfoQuery();
  const { data: availableSeminarData } = useGetAvailableSeminarInfoQuery();

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

  const [currentCardIndex, setCurrentCardIndex] = useState(1);

  const handleNextButtonClick = () => {
    setCurrentCardIndex(currentCardIndex + 1);
  };

  const handlePreviousButtonClick = () => {
    setCurrentCardIndex(currentCardIndex - 1);
  };

  useEffect(() => {
    if (!localStorage.getItem('출석시도횟수')) localStorage.setItem('출석시도횟수', '0');
  }, []);

  useEffect(() => {
    if (isGetRecentlyDoneSeminarIdSuccess && isGetRecentlyUpcomingSeminarIdsSuccess) {
      setVisibleSeminars([
        { order: 1, id: twoUpcomingSeminarIds.at(1)?.id },
        { order: 2, id: twoUpcomingSeminarIds.at(0)?.id },
        { order: 3, id: recentlyDoneSeminarId.id },
      ]);
    }
  }, [isGetRecentlyDoneSeminarIdSuccess, isGetRecentlyUpcomingSeminarIdsSuccess]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex text-center md:mt-[180px] md:space-x-4 md:[&>*:nth-child(2)]:mt-[-50px]">
        {visibleSeminars.map((visibleSeminar) => {
          return (
            <div
              key={visibleSeminar.order}
              className={`${visibleSeminar.order - 1 === currentCardIndex ? 'block md:flex' : 'hidden md:flex'}`}
            >
              <SeminarCard>
                {visibleSeminar.id !== undefined ? (
                  <div>
                    {isStarterMember() ? (
                      <BossCardContent seminarId={visibleSeminar.id} />
                    ) : (
                      <MemberCardContent seminarId={visibleSeminar.id} />
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
          <VscChevronLeft size={20} />
        </OutlinedButton>
        <OutlinedButton onClick={handleNextButtonClick} disabled={currentCardIndex === visibleSeminars.length - 1}>
          <VscChevronRight size={20} />
        </OutlinedButton>
      </div>
    </div>
  );
};

export default SeminarAttend;
