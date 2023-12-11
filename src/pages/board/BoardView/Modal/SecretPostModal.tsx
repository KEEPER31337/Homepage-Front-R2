import React, { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { BOARD_MSG, COMMON } from '@constants/helperText';
import { POST_PASSWORD_MAX_LENGTH } from '@pages/board/BoardWrite/Modal/SettingUploadModal';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';

interface SecretPostModalProps {
  setPassword: Dispatch<SetStateAction<string | undefined>>;
  setIsSecretPasswordSubmited: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SecretPostModal = ({ setPassword, setIsSecretPasswordSubmited, open, setOpen }: SecretPostModalProps) => {
  const navigate = useNavigate();

  const { control, getValues, reset } = useForm({ mode: 'onBlur' });

  const handlePasswordConfirmClick = () => {
    setPassword(getValues('password'));
    reset();
    setIsSecretPasswordSubmited(true);
  };

  const handleActionEnterKeyUp = () => {
    handlePasswordConfirmClick();
  };

  return (
    <ActionModal
      open={open}
      onClose={() => {
        setOpen(false);
        navigate(-1);
      }}
      title="비밀글 보기"
      actionButtonName="확인"
      onActionButonClick={handlePasswordConfirmClick}
      onActionEnterKeyUp={handleActionEnterKeyUp}
    >
      <Typography>비밀글을 보려면 비밀번호를 입력해주세요.</Typography>
      <Typography variant="small">(작성자는 확인 버튼만 누르면 됩니다.)</Typography>
      <div className="my-5 flex justify-center">
        <Controller
          name="password"
          defaultValue=""
          control={control}
          rules={{
            required: BOARD_MSG.error.requiredPassword,
            maxLength: {
              value: POST_PASSWORD_MAX_LENGTH,
              message: COMMON.error.maxLength(POST_PASSWORD_MAX_LENGTH),
            },
          }}
          render={({ field, fieldState: { error } }) => {
            return <StandardInput {...field} type="password" error={Boolean(error)} helperText={error?.message} />;
          }}
        />
      </div>
    </ActionModal>
  );
};

export default SecretPostModal;
