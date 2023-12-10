import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { InputLabel } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useGetProfileQuery } from '@api/memberApi';
import { useSendPointMutation } from '@api/pointApi';
import { COMMON, SEND_POINT_MSG } from '@constants/helperText';
import memberState from '@recoil/member.recoil';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';

const SEND_POINT_MAX_LENGTH = 30;

interface SendPointModalProps {
  open: boolean;
  onClose: () => void;
  sendTo: number;
}

const SendPointModal = ({ open, onClose, sendTo }: SendPointModalProps) => {
  const userInfo = useRecoilValue(memberState);
  const {
    control,
    getValues,
    reset,
    formState: { isValid },
  } = useForm({ mode: 'onBlur' });
  const { data: profileInfo } = useGetProfileQuery(userInfo?.memberId || 0);
  const { mutate: sendPoint } = useSendPointMutation();

  const superOnClose = () => {
    reset();
    onClose();
  };

  const handleSendActionButtonClick = () => {
    if (isValid) {
      sendPoint(
        {
          point: getValues('point'),
          message: getValues('message'),
          memberId: sendTo,
        },
        {
          onSuccess: () => {
            superOnClose();
          },
        },
      );
    }
  };

  return (
    <ActionModal
      open={open}
      onClose={superOnClose}
      title="포인트 선물"
      modalWidth="sm"
      actionButtonName="선물"
      onActionButonClick={handleSendActionButtonClick}
    >
      {profileInfo && (
        <div className="mb-5 gap-y-5">
          <p className="w-full text-right">보유 포인트 {profileInfo?.point}</p>
          <div>
            <InputLabel className="!text-pointBlue">포인트</InputLabel>
            <Controller
              name="point"
              defaultValue={1}
              control={control}
              rules={{
                required: COMMON.error.required,
                max: {
                  value: profileInfo.point,
                  message: SEND_POINT_MSG.error.overMaxValue,
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: COMMON.error.onlyNumber,
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <StandardInput
                  className="w-full"
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  autoFocus
                />
              )}
            />
          </div>
          <div>
            <InputLabel className="mt-10 !text-pointBlue">메시지</InputLabel>
            <Controller
              name="message"
              defaultValue=""
              control={control}
              rules={{
                required: COMMON.error.required,
                maxLength: {
                  value: SEND_POINT_MAX_LENGTH,
                  message: COMMON.error.overMaxLen(SEND_POINT_MAX_LENGTH),
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <StandardInput
                  className="w-full"
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  autoFocus
                />
              )}
            />
          </div>
        </div>
      )}
    </ActionModal>
  );
};

export default SendPointModal;
