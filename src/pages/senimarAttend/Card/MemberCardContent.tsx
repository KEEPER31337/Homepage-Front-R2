import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { DateTime } from 'luxon';
import { useRecoilState } from 'recoil';
import { SeminarStatus } from '@api/dto';
import { useAttendSeminarMutation, useGetAvailableSeminarInfoQuery, useGetSeminarInfoQuery } from '@api/seminarApi';
import FilledButton from '@components/Button/FilledButton';
import ConfirmModal from '@components/Modal/ConfirmModal';
import Countdown from '../Countdown/Countdown';
import SeminarInput from '../Input/SeminarInput';
import SeminarAttendStatus from '../Status/SeminarAttendStatus';
import attendCountState from '../seminarAttend.recoil';
import { MEMBER_CARD } from '@constants/apiResponseMsg';

interface ErrorResponse {
  message: string;
}

const MAX_ATTEND_COUNT = 5;

const MemberCardContent = ({ seminarId }: { seminarId: number }) => {
  const { data: seminarData } = useGetSeminarInfoQuery(seminarId);
  const { mutate: attend, isSuccess: isAttendSuccess, data: attendData } = useAttendSeminarMutation(seminarId);

  const [incorrectCodeMsg, setIncorrectCodeMsg] = useState('ㅤ');
  const [inputCode, setInputCode] = useState('');
  const [attendStatus, setAttendStatus] = useState<undefined | SeminarStatus>(undefined);
  const [excessModalOpen, setExcessModalOpen] = useState(false);
  const [isTransitionTime, setIsTransitionTime] = useState(false);

  const [attendCount, setAttendCount] = useRecoilState(attendCountState);

  const { data: availableSeminarData } = useGetAvailableSeminarInfoQuery();
  const isValidActivityStatus = (value: SeminarStatus) => {
    return value === 'ATTENDANCE' || value === 'LATENESS' || value === 'ABSENCE' || value === 'BEFORE_ATTENDANCE';
  };
  const unableSeminar =
    !availableSeminarData?.id || availableSeminarData?.id !== seminarData?.id || attendCount >= MAX_ATTEND_COUNT;

  useEffect(() => {
    setAttendStatus(seminarData?.statusType);
  }, [seminarData]);

  const handleAttendButtonClick = () => {
    attend(inputCode, {
      onError: (error) => {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response?.status === 400) {
          const remainAttendCount = MAX_ATTEND_COUNT - attendCount - 1;
          setAttendCount((prev) => prev + 1);

          if (remainAttendCount <= 0) {
            setExcessModalOpen(true);
            setIncorrectCodeMsg(MEMBER_CARD.error.noSubmissionsLeft);
            return;
          }
          setIncorrectCodeMsg(MEMBER_CARD.error.invalidAttendanceWithCount(remainAttendCount));
          return;
        }
        const errorMessage = axiosError?.response?.data?.message;
        setIncorrectCodeMsg(errorMessage?.slice((errorMessage?.indexOf(':') || 0) + 1) ?? 'ㅤ');
      },
    });
  };

  useEffect(() => {
    if (isAttendSuccess && isValidActivityStatus(attendData.data.statusType)) {
      setAttendStatus(attendData.data.statusType);
      setIncorrectCodeMsg('ㅤ');
    }
  }, [isAttendSuccess]);

  useEffect(() => {
    setIncorrectCodeMsg('ㅤ');
  }, []);

  useEffect(() => {
    if (seminarData?.latenessCloseTime && DateTime.now() > seminarData.latenessCloseTime) {
      setAttendCount(0);
    }
  }, [unableSeminar]);

  return (
    <div className={`${unableSeminar && 'opacity-50'}`}>
      <ConfirmModal
        open={excessModalOpen}
        modalWidth="xs"
        onClose={() => setExcessModalOpen(false)}
        title="출석 제한 횟수 초과"
      >
        <Typography>가능한 출석 횟수를 초과했습니다.</Typography>
        <Typography>출석 처리에 문제가 있는 경우 회장님에게 문의해주세요</Typography>
      </ConfirmModal>
      <Typography className="!mt-[16px] !text-h3 !font-bold">{seminarData?.name} 세미나</Typography>
      <p className="mb-[14px] mt-[26px]">출석 코드</p>
      <div className="mb-[15px]">
        <SeminarInput
          disabled={unableSeminar}
          helperText={incorrectCodeMsg}
          setInputCode={(res: string) => setInputCode(res)}
          inputCode={unableSeminar ? '' : inputCode}
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
              <Countdown
                startTime={seminarData.attendanceStartTime}
                endTime={seminarData.attendanceCloseTime}
                isTransitionTime={isTransitionTime}
                setIsTransitionTime={setIsTransitionTime}
              />
              <Countdown
                startTime={seminarData.attendanceCloseTime}
                endTime={seminarData.latenessCloseTime}
                isTransitionTime={isTransitionTime}
                setIsTransitionTime={setIsTransitionTime}
              />
            </>
          )}
        </div>
      </div>
      <div className="mt-[39px] flex justify-center">
        {attendStatus === 'ATTENDANCE' || attendStatus === 'LATENESS' || attendStatus === 'ABSENCE' ? (
          <SeminarAttendStatus status={attendStatus} />
        ) : (
          <FilledButton onClick={handleAttendButtonClick} disabled={unableSeminar}>
            출석
          </FilledButton>
        )}
      </div>
    </div>
  );
};

export default MemberCardContent;
