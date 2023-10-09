import React, { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { REQUIRE_ERROR_MSG } from '@constants/errorMsg';
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

  const { control, getValues } = useForm({ mode: 'onBlur' });

  const handlePasswordConfirmClick = () => {
    setPassword(getValues('password'));
    setIsSecretPasswordSubmited(true);
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
    >
      <Typography>비밀글을 보려면 비밀번호를 입력해주세요.</Typography>
      <Typography variant="small">(작성자는 확인 버튼만 누르면 됩니다.)</Typography>
      <div className="my-5 flex justify-center">
        <Controller
          name="password"
          defaultValue=""
          control={control}
          rules={{
            required: `작성자가 아닐 시 ${REQUIRE_ERROR_MSG}`,
            maxLength: {
              value: POST_PASSWORD_MAX_LENGTH,
              message: `비밀번호는 최대 ${POST_PASSWORD_MAX_LENGTH}글자 입력이 가능합니다.`,
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
