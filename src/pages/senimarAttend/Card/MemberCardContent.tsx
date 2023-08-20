import React, { useState, useEffect } from 'react';
import FilledButton from '@components/Button/FilledButton';
import { DateTime } from 'luxon';
import {
  attendSeminar,
  editAttendStatus,
  useGetAvailableSeminarInfoQuery,
  useGetSeminarInfoQuery,
} from '@api/seminarApi';
import { AxiosError } from 'axios';
import ActivityStatus from '@api/dto';
import Countdown from '../Countdown/Countdown';
import SeminarInput from '../Input/SeminarInput';
import SeminarAttendStatus from '../Status/SeminarAttendStatus';

interface ErrorResponse {
  message: string;
}

const MemberCardContent = () => {
  const { data: seminarData } = useGetSeminarInfoQuery(5); // TODO: 파라미터로 아이디 받아오기
  const { mutate: attend, isSuccess, error, data: attendData } = attendSeminar(5);
  const startTime = DateTime.fromISO(seminarData?.openTime || '');
  const attendLimit = DateTime.fromISO(seminarData?.attendanceCloseTime || '');
  const lateLimit = DateTime.fromISO(seminarData?.latenessCloseTime || '');
  const validCode = seminarData?.attendanceCode;
  const [incorrectCodeMsg, setIncorrectCodeMsg] = useState('ㅤ');
  const [inputCode, setInputCode] = useState([0, 0, 0, 0]);
  const [attendStatus, setAttendStatus] = useState<undefined | ActivityStatus>(undefined);
  const { data: availableSeminarData } = useGetAvailableSeminarInfoQuery();
  const isValidActivityStatus = (value: string): value is ActivityStatus => {
    return value === 'ATTENDANCE' || value === 'LATENESS' || value === 'ABSENCE' || value === 'BEFORE_ATTENDANCE';
  };
  const { mutate: editStatus } = editAttendStatus(5, 6); // 테스트용 임시

  const unableSeminar = !availableSeminarData?.id || availableSeminarData?.id !== seminarData?.seminarId;

  useEffect(() => {
    setAttendStatus(seminarData?.statusType);
  }, [seminarData]);

  const handleAttendButtonClick = () => {
    attend(inputCode.join(''));
  };

  useEffect(() => {
    if (isSuccess && isValidActivityStatus(attendData.data.statusType)) {
      setAttendStatus(attendData.data.statusType);
      setIncorrectCodeMsg('ㅤ');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (inputCode.join('') !== validCode) setIncorrectCodeMsg('출석코드가 맞지 않습니다. 다시 입력해주세요.');
    else {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError?.response?.data?.message;
      setIncorrectCodeMsg(errorMessage?.slice((errorMessage?.indexOf(':') || 0) + 1) ?? 'ㅤ');
    }
  }, [error]);

  useEffect(() => {
    setIncorrectCodeMsg('ㅤ');
  }, []);

  const deleteAttendance = () => {
    editStatus({ excuse: 'test', statusType: 'BEFORE_ATTENDANCE' });
  };

  return (
    <div className={`${unableSeminar && 'opacity-50'}`}>
      <div className="mb-[15px]">
        <SeminarInput
          disabled={unableSeminar}
          helperText={incorrectCodeMsg}
          setInputCode={setInputCode}
          inputCode={unableSeminar ? ['', '', '', ''] : inputCode}
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
