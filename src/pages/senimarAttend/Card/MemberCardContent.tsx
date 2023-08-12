import React, { useState, useEffect } from 'react';
import FilledButton from '@components/Button/FilledButton';
import { DateTime } from 'luxon';
import { attendSeminar, editAttendStatus, getAvailableSeminarInfo } from '@api/seminarApi';
import Countdown from '../Countdown/Countdown';
import SeminarInput from '../Input/SeminarInput';
import SeminarAttendStatus from '../Status/SeminarAttendStatus';
import ActivityStatus from '../SeminarAttend.interface';

const MemberCardContent = () => {
  const [isAttendable, setIsAttendable] = useState(false);
  const [isCorrectCode, setIsCorrectCode] = useState(false);
  const { data: availableSeminarData, refetch: availableSeminarRefetch } = getAvailableSeminarInfo(); // 진행중인 세미나 존재하는가
  const { mutate: attend, isSuccess, data: attendancyData } = attendSeminar(2);
  const startTime = DateTime.fromISO(availableSeminarData?.openTime || '');
  const attendLimit = DateTime.fromISO(availableSeminarData?.attendanceCloseTime || '');
  const lateLimit = DateTime.fromISO(availableSeminarData?.latenessCloseTime || '');
  const validCode = availableSeminarData?.attendanceCode;
  const isIncorrectCodeInPeriod = isAttendable && !isCorrectCode;
  const [incorrectCodeMsg, setIncorrectCodeMsg] = useState('ㅤ');
  const [inputCode, setInputCode] = useState([0, 0, 0, 0]);
  const [attendStatus, setAttendStatus] = useState<undefined | ActivityStatus>(undefined);
  const isValidActivityStatus = (value: string): value is ActivityStatus => {
    return value === 'ATTENDANCE' || value === 'LATENESS' || value === 'ABSENCE' || value === 'BEFORE_ATTENDANCE';
  };
  const { mutate: editStatus } = editAttendStatus(2, 2); // 테스트용 임시

  useEffect(() => {
    availableSeminarRefetch();
    console.log(availableSeminarData);
    if (!availableSeminarData?.id) localStorage.removeItem('출석시도횟수');
  }, [availableSeminarData]);

  const handleAttendButtonClick = () => {
    attend(inputCode.join(''));
    setIsCorrectCode(isSuccess);
    console.log(attendancyData?.statusText);
    if (isSuccess && isValidActivityStatus(attendancyData.statusText)) {
      console.log(attendancyData.statusText);
      setAttendStatus(attendancyData.statusText);
      setIncorrectCodeMsg('ㅤ');
    }
    if (inputCode.join('') !== validCode) {
      setIncorrectCodeMsg('출석코드가 맞지 않습니다. 다시 입력해주세요.');
      const attemptNum = parseInt(localStorage.getItem('출석시도횟수') ?? '0', 10) + 1;
      if (attemptNum <= 5) localStorage.setItem('출석시도횟수', String(attemptNum));
    } else setIncorrectCodeMsg('ㅤ');
  };

  const deleteAttendance = () => {
    editStatus({ excuse: 'test', statusType: 'BEFORE_ATTENDANCE' });
  };

  // TODO: 출석 종료시 자동 결석처리, 문구 결석으로 바꾸기

  return (
    <div className={`${availableSeminarData?.id === null && 'opacity-50'}`}>
      <div className="mb-[15px]">
        <SeminarInput
          disabled={availableSeminarData?.id === null}
          helperText={incorrectCodeMsg}
          setInputCode={setInputCode}
          inputCode={availableSeminarData?.id === null ? ['', '', '', ''] : inputCode}
        />
      </div>

      <div className="mx-auto mt-[20px] flex h-[60px] w-[146px] justify-between">
        <div className="grid content-between">
          <div>출석</div>
          <div>지각</div>
        </div>
        <div className="grid content-between text-right">
          <Countdown startTime={startTime} endTime={attendLimit} />
          <Countdown startTime={attendLimit} endTime={lateLimit} />
        </div>
      </div>
      <div className="mt-[39px] flex justify-center">
        {attendStatus === 'ATTENDANCE' || attendStatus === 'LATENESS' || attendStatus === 'ABSENCE' ? (
          <SeminarAttendStatus status={attendStatus} />
        ) : (
          <>
            <FilledButton
              onClick={() => {
                handleAttendButtonClick();
              }}
            >
              출석
            </FilledButton>
            <FilledButton
              onClick={() => {
                deleteAttendance();
              }}
            >
              출석기록 삭제
            </FilledButton>
          </>
        )}
      </div>
    </div>
  );
};

export default MemberCardContent;
