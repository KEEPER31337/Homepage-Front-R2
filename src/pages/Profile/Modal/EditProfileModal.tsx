import React, { useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import { ProfileInfo } from '@api/dto';
import { useEditProfileMutation, useEditProfileThumbnailMutation } from '@api/memberApi';
import { COMMON, NAME_MSG } from '@constants/helperText';
import StandardDatePicker from '@components/DatePicker/StandardDatePicker';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';
import ProfileImageUploader from '@components/Uploader/ProfileImageUploader';

interface EditProfileModalProps {
  profileInfo: ProfileInfo;
  open: boolean;
  onClose: () => void;
}

const NAME_MAX_LENGTH = 20;

const EditProfileModal = ({ profileInfo, open, onClose }: EditProfileModalProps) => {
  const [thumbnail, setThumbnail] = useState<Blob | null>(null);
  const [isThumbnailChanged, setIsThumbnailChanged] = useState(false);

  const { control, handleSubmit } = useForm({ mode: 'onBlur' });

  const { mutate: editProfile } = useEditProfileMutation(profileInfo.id);
  const { mutate: editProfileThumbnail } = useEditProfileThumbnailMutation(profileInfo.id);

  const handleSecondStepFormSubmit: SubmitHandler<FieldValues> = ({ realName, birthday }) => {
    editProfile(
      { realName, birthday: birthday ? birthday.toFormat('yyyy.MM.dd') : null },
      {
        onSuccess: () => {
          if (isThumbnailChanged) {
            editProfileThumbnail({ thumbnail });
          }

          onClose();
        },
      },
    );
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="프로필 수정"
      modalWidth="sm"
      actionButtonName="수정"
      onActionButonClick={handleSubmit(handleSecondStepFormSubmit)}
    >
      <Stack direction={{ sm: 'column', md: 'row' }} spacing={4} justifyContent="space-between" alignItems="center">
        <div className="mx-auto my-6 h-52 w-52 rounded-full md:mb-0">
          <ProfileImageUploader
            isEdit
            thumbnailPath={profileInfo.thumbnailPath ?? undefined}
            setThumbnail={setThumbnail}
            setIsThumbnailChanged={setIsThumbnailChanged}
          />
        </div>
        <Stack width={{ sm: '100%', md: '55%' }} component="form" spacing={3}>
          <Controller
            name="realName"
            defaultValue={profileInfo.realName}
            control={control}
            rules={{
              required: COMMON.error.required,
              maxLength: {
                value: NAME_MAX_LENGTH,
                message: COMMON.error.maxLength(NAME_MAX_LENGTH),
              },
              pattern: {
                value: /^[가-힣a-zA-Z]{1,20}$/,
                message: NAME_MSG.error.formatError,
              },
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <StandardInput
                  className="w-full"
                  hasBackground
                  label="이름"
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              );
            }}
          />

          <Controller
            name="birthday"
            defaultValue=""
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <StandardDatePicker
                  hasBackground
                  label={
                    <>
                      <span className="mr-1">생일</span>
                      <span className="opacity-30">(선택)</span>
                    </>
                  }
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              );
            }}
          />
        </Stack>
      </Stack>
    </ActionModal>
  );
};

export default EditProfileModal;
