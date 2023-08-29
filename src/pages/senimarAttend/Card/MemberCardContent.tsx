import React, { useState, useEffect } from 'react';
import FilledButton from '@components/Button/FilledButton';
import ConfirmModal from '@components/Modal/ConfirmModal';
import { Typography } from '@mui/material';
import { useAttendSeminarMutation, useGetAvailableSeminarInfoQuery, useGetSeminarInfoQuery } from '@api/seminarApi';
import { AxiosError } from 'axios';
import { ActivityStatus } from '@api/dto';
import Countdown from '../Countdown/Countdown';
import SeminarInput from '../Input/SeminarInput';
import SeminarAttendStatus from '../Status/SeminarAttendStatus';

interface ErrorResponse {
  message: string;
}

const MemberCardContent = ({ seminarId }: { seminarId: number }) => {
  const { data: seminarData } = useGetSeminarInfoQuery(seminarId);
  const {
    mutate: attend,
    isSuccess: isAttendSuccess,
    error: attendError,
    data: attendData,
  } = useAttendSeminarMutation(seminarId);
  const validCode = seminarData?.attendanceCode;
  const [incorrectCodeMsg, setIncorrectCodeMsg] = useState('ㅤ');
  const [inputCode, setInputCode] = useState([0, 0, 0, 0]);
  const [attendStatus, setAttendStatus] = useState<undefined | ActivityStatus>(undefined);
  const [excessModalOn, setExcessModalOn] = useState(false);
  const { data: availableSeminarData } = useGetAvailableSeminarInfoQuery();
  const isValidActivityStatus = (value: ActivityStatus) => {
    return value === 'ATTENDANCE' || value === 'LATENESS' || value === 'ABSENCE' || value === 'BEFORE_ATTENDANCE';
  };
  const unableSeminar = !availableSeminarData?.id || availableSeminarData?.id !== seminarData?.seminarId;

  useEffect(() => {
    setAttendStatus(seminarData?.statusType);
  }, [seminarData]);

  const handleAttendButtonClick = () => {
    attend(inputCode.join(''));
    if (parseInt(localStorage.getItem('출석시도횟수') ?? '0', 10) + 1 >= 5) setExcessModalOn(true);
  };

  useEffect(() => {
    if (isAttendSuccess && isValidActivityStatus(attendData.data.statusType)) {
      setAttendStatus(attendData.data.statusType);
      setIncorrectCodeMsg('ㅤ');
      localStorage.removeItem('출석시도횟수');
    }
  }, [isAttendSuccess]);

  useEffect(() => {
    if (inputCode.join('') !== validCode) {
      const attemptNum = parseInt(localStorage.getItem('출석시도횟수') ?? '0', 10) + 1;
      if (attemptNum <= 5) {
        localStorage.setItem('출석시도횟수', String(attemptNum));
        setIncorrectCodeMsg(`출석코드가 틀렸습니다.(남은 제출횟수 ${attemptNum}회)`);
      }
    } else {
      const axiosError = attendError as AxiosError<ErrorResponse>;
      const errorMessage = axiosError?.response?.data?.message;
      setIncorrectCodeMsg(errorMessage?.slice((errorMessage?.indexOf(':') || 0) + 1) ?? 'ㅤ');
    }
  }, [attendError]);

  useEffect(() => {
    setIncorrectCodeMsg('ㅤ');
  }, []);

  return (
    <div className={`${unableSeminar && 'opacity-50'}`}>
      <ConfirmModal
        open={excessModalOn}
        modalWidth="sm"
        onClose={() => setExcessModalOn(false)}
        title="출석 제한 횟수 초과"
      >
        <Typography>가능한 출석 횟수를 초과했습니다.</Typography>
        <Typography>출석 처리에 문제가 있는 경우 회장님에게 문의해주세요</Typography>
      </ConfirmModal>
      <Typography className="!mt-[16px] !text-h3 !font-bold ">
        {seminarData?.seminarName.replaceAll('-', '.')} 세미나
      </Typography>
      <p className="mb-[14px] mt-[26px]">출석 코드</p>
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
          <FilledButton onClick={handleAttendButtonClick}>출석</FilledButton>
        )}
      </div>
    </div>
  );
};

export default MemberCardContent;
