import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import FilledButton from '@components/Button/FilledButton';
import { Typography } from '@mui/material';
import { useGetSeminarInfoQuery } from '@api/seminarApi';
import SeminarCard from './Card/SeminarCard';
import BossCardContent from './Card/BossCardContent';
import MemberCardContent from './Card/MemberCardContent';

const SeminarAttend = () => {
  const seminarDate = DateTime.now(); // 이후 삭제
  const seminarActivated = true; // TODO: useState, api 적용
  const recentSeminarDate = useGetSeminarInfoQuery(5).data?.openTime.toString().slice(2, 10).replaceAll('-', '.'); // TODO: 이후 최근/예정/이전 세미나 날짜 조회 api로 교체
  const [futureSeminarDate, setFutureSeminarDate] = useState('towmorrow');
  const [pastSeminarDate, setPastSeminarDate] = useState('yesterday');
  const [isBoss, setIsBoss] = useState(true); // TODO: api 적용
  const cardDateOrder = [pastSeminarDate, recentSeminarDate, futureSeminarDate]; // 해당 세미나 날짜 또는 id 담기

  useEffect(() => {
    setFutureSeminarDate(seminarDate.plus({ days: 1 }).toFormat('yy.MM.dd'));
    setPastSeminarDate(seminarDate.minus({ days: 1 }).toFormat('yy.MM.dd'));
  }, []);

  return (
    <>
      <div className="mt-[180px] flex justify-between text-center [&>*:nth-child(2)]:mt-[-50px]">
        {cardDateOrder.map((date) => {
          // CardContent 파라미터로 id 또는 date 전달
          return (
            <SeminarCard key={date}>
              {seminarActivated ? (
                <>
                  <Typography className="!mt-[16px] !text-h3 !font-bold ">{date} 세미나</Typography>
                  <p className="mb-[14px] mt-[26px]">출석 코드</p>
                  {isBoss ? <BossCardContent /> : <MemberCardContent />}
                </>
              ) : (
                <Typography className="text-center text-h3 font-bold">예정된 세미나가 없습니다.</Typography>
              )}
            </SeminarCard>
          );
        })}
      </div>
      {isBoss ? (
        <FilledButton onClick={() => setIsBoss(false)}>회원권한페이지로</FilledButton>
      ) : (
        <FilledButton onClick={() => setIsBoss(true)}>회장권한페이지로</FilledButton>
      )}
    </>
  );
};

export default SeminarAttend;
