import React, { useState, useEffect } from 'react';
import FilledButton from '@components/Button/FilledButton';
import { DateTime } from 'luxon';
import {
  useAttendSeminarMutation,
  useEditAttendStatusMutation,
  useGetAvailableSeminarInfoQuery,
  useGetSeminarInfoQuery,
} from '@api/seminarApi';
import { AxiosError } from 'axios';
import { ActivityStatus } from '@api/dto';
import Countdown from '../Countdown/Countdown';
import SeminarInput from '../Input/SeminarInput';
import SeminarAttendStatus from '../Status/SeminarAttendStatus';

interface ErrorResponse {
  message: string;
}

const MemberCardContent = () => {
  const { data: seminarData } = useGetSeminarInfoQuery(5); // TODO: 파라미터로 아이디 받아오기
  const {
    mutate: attend,
    isSuccess: isAttendSuccess,
    error: attendError,
    data: attendData,
  } = useAttendSeminarMutation(5);
  const validCode = seminarData?.attendanceCode;
  const [incorrectCodeMsg, setIncorrectCodeMsg] = useState('ㅤ');
  const [inputCode, setInputCode] = useState([0, 0, 0, 0]);
  const [attendStatus, setAttendStatus] = useState<undefined | ActivityStatus>(undefined);
  const { data: availableSeminarData } = useGetAvailableSeminarInfoQuery();
  const isValidActivityStatus = (value: ActivityStatus) => {
    return value === 'ATTENDANCE' || value === 'LATENESS' || value === 'ABSENCE' || value === 'BEFORE_ATTENDANCE';
  };
  const { mutate: editStatus } = useEditAttendStatusMutation(5, 6); // 테스트용 임시

  const unableSeminar = !availableSeminarData?.id || availableSeminarData?.id !== seminarData?.seminarId;

  useEffect(() => {
    setAttendStatus(seminarData?.statusType);
  }, [seminarData]);

  const handleAttendButtonClick = () => {
    attend(inputCode.join(''));
  };

  useEffect(() => {
    if (isAttendSuccess && isValidActivityStatus(attendData.data.statusType)) {
      setAttendStatus(attendData.data.statusType);
      setIncorrectCodeMsg('ㅤ');
    }
  }, [isAttendSuccess]);

  useEffect(() => {
    if (inputCode.join('') !== validCode) setIncorrectCodeMsg('출석코드가 맞지 않습니다. 다시 입력해주세요.');
    else {
      const axiosError = attendError as AxiosError<ErrorResponse>;
      const errorMessage = axiosError?.response?.data?.message;
      setIncorrectCodeMsg(errorMessage?.slice((errorMessage?.indexOf(':') || 0) + 1) ?? 'ㅤ');
    }
  }, [attendError]);

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
          {seminarData && (
            <>
              <Countdown startTime={seminarData.openTime} endTime={seminarData.attendanceCloseTime} />
              <Countdown startTime={seminarData.attendanceCloseTime} endTime={seminarData.latenessCloseTime} />
            </>
          )}
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
