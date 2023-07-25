import React, { useState } from 'react';
import FilledButton from '@components/Button/FilledButton';
import { DateTime } from 'luxon';
import Countdown from '../Countdown/Countdown';
import SeminarInput from '../Input/SeminarInput';
import SeminarAttendStatus from '../Status/SeminarAttendStatus';
import ActivityStatus from '../SeminarAttend.interface';

const MemberCardContent = () => {
  const [isAttendable, setIsAttendable] = useState(false);
  const [isCorrectCode, setIsCorrectCode] = useState(false);
  const isIncorrectCodeInPeriod = isAttendable && !isCorrectCode;
  const [incorrectCodeMsg, setIncorrectCodeMsg] = useState('ㅤ');
  const [startTime, setStartTime] = useState(DateTime.now());
  const attendLimit = startTime.plus({ days: 0, hours: 0, minutes: 0, seconds: 5 }); // 임시:이후 api에서 가져옴
  const lateLimit = attendLimit.plus({ days: 0, hours: 0, minutes: 0, seconds: 5 }); // 임시: 이후 api에서 가져옴
  const [inputCode, setInputCode] = useState([0, 0, 0, 0]);
  const validCode = '1234'; // 임시
  const [attendStatus, setAttendStatus] = useState<undefined | ActivityStatus>(undefined);
  const [remainAttendance, setRemainAttendance] = useState(Number(localStorage.getItem('remaining attendance')));

  const handleAttendButtonClick = () => {
    setIsCorrectCode(inputCode.join('') === validCode);
    const nowTime = DateTime.now();
    setIsAttendable(nowTime < lateLimit);
    if (inputCode.join('') === validCode) {
      // TODO: 출석 api 연동
      setIncorrectCodeMsg('ㅤ');
      if (nowTime < attendLimit) setAttendStatus('출석');
      else if (nowTime < lateLimit) setAttendStatus('지각');
      else setAttendStatus('결석');
    } else if (Number(localStorage.getItem('remaining attendance'))) {
      localStorage.setItem('remaining attendance', String(remainAttendance - 1));
      setRemainAttendance(remainAttendance - 1);
      setIncorrectCodeMsg('출석코드가 맞지 않습니다. 다시 입력해주세요.');
    } else {
      // 모달 띄우기
      console.log('모달');
    }
  };

  // TODO: 출석 종료시 자동 결석처리, 문구 결석으로 바꾸기

  return (
    <>
      <div className="mb-[15px]">
        <SeminarInput helperText={incorrectCodeMsg} setInputCode={setInputCode} inputCode={inputCode} />
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
        {attendStatus !== undefined ? (
          <SeminarAttendStatus status={attendStatus} />
        ) : (
          <FilledButton
            onClick={() => {
              handleAttendButtonClick();
            }}
          >
            출석
          </FilledButton>
        )}
      </div>
    </>
  );
};

export default MemberCardContent;
