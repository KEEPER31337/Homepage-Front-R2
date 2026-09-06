import React, { useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import {
  useGetSeminarInfoQuery,
  useGetRecentlyDoneSeminarInfoQuery,
  useGetRecentlyUpcomingSeminarInfoQuery,
} from '@api/seminarApi';
import { MEMBER_ROLE } from '@constants/member';
import useCheckAuth from '@hooks/useCheckAuth';
import { useMeQuery } from '@api/meApi';
import OutlinedButton from '@components/Button/OutlinedButton';
import BossCardContent from './Card/BossCardContent';
import MemberCardContent from './Card/MemberCardContent';
import SeminarCard from './Card/SeminarCard';

const SeminarCardContent = ({ seminarId }: { seminarId: number }) => {
  const { data: seminarData, isLoading } = useGetSeminarInfoQuery(seminarId);
  const { data: member } = useMeQuery();
  const { checkIncludeOneOfAuths } = useCheckAuth();
  const authorizedMember = checkIncludeOneOfAuths([MEMBER_ROLE.회장, MEMBER_ROLE.부회장, MEMBER_ROLE.서기]);

  if (isLoading) {
    return <CircularProgress />;
  }

  const showBossCard =
    seminarData && authorizedMember && (!seminarData.attendanceStartTime || seminarData.starterId === member?.memberId);

  return showBossCard ? <BossCardContent seminarId={seminarId} /> : <MemberCardContent seminarId={seminarId} />;
};

const SeminarAttend = () => {
  const { data: recentlyDoneSeminarId, isSuccess: isGetRecentlyDoneSeminarIdSuccess } =
    useGetRecentlyDoneSeminarInfoQuery();
  const { data: twoUpcomingSeminarIds, isSuccess: isGetRecentlyUpcomingSeminarIdsSuccess } =
    useGetRecentlyUpcomingSeminarInfoQuery();

  const [currentCardIndex, setCurrentCardIndex] = useState(1);

  const handleNextButtonClick = () => {
    setCurrentCardIndex(currentCardIndex + 1);
  };

  const handlePreviousButtonClick = () => {
    setCurrentCardIndex(currentCardIndex - 1);
  };

  const visibleSeminars: { order: number; id?: number }[] =
    isGetRecentlyDoneSeminarIdSuccess && isGetRecentlyUpcomingSeminarIdsSuccess
      ? [
          { order: 1, id: twoUpcomingSeminarIds.at(1)?.id },
          { order: 2, id: twoUpcomingSeminarIds.at(0)?.id },
          { order: 3, id: recentlyDoneSeminarId.id },
        ]
      : [{ order: 1 }, { order: 2 }, { order: 3 }];

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
                  <div className="h-full">
                    <SeminarCardContent seminarId={visibleSeminar.id} />
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
