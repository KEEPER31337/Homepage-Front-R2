import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormGroup, Typography, useMediaQuery, useTheme } from '@mui/material';
import { UploadPostSettings, PostInfo } from '@api/dto';
import { COMMON } from '@constants/helperText';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';
import ImageUploader from '@components/Uploader/ImageUploader';

export const POST_PASSWORD_MAX_LENGTH = 16;

interface SettingUploadModalProps {
  editMode: {
    postId: number;
    post: PostInfo;
  } | null;
  open: boolean;
  onClose: () => void;
  onUploadButonClick: () => void;
  postSettingInfo: UploadPostSettings;
  setPostSettingInfo: React.Dispatch<React.SetStateAction<UploadPostSettings>>;
  setThumbnail: React.Dispatch<React.SetStateAction<Blob | null>>;
  setIsThumbnailChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingUploadModal = ({
  editMode,
  open,
  onClose,
  onUploadButonClick,
  postSettingInfo,
  setPostSettingInfo,
  setThumbnail,
  setIsThumbnailChanged,
}: SettingUploadModalProps) => {
  const {
    control,
    watch,
    reset: resetPassword,
    formState: { isValid },
  } = useForm({ mode: 'onBlur' });
  const password = watch('password');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (name === 'isSecret' && !checked) {
      resetPassword();

      const copyPostSettingInfo = { ...postSettingInfo };
      delete copyPostSettingInfo.password;

      setPostSettingInfo(copyPostSettingInfo);
    }

    setPostSettingInfo((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  useEffect(() => {
    if (!postSettingInfo.isSecret) return;

    setPostSettingInfo((prev) => ({ ...prev, password }));
  }, [password]);

  return (
    <ActionModal
      modalWidth={isMobile ? 'sm' : undefined}
      open={open}
      onClose={onClose}
      title={`설정 확인 및 ${postSettingInfo.isTemp ? '임시저장' : '업로드'}`}
      actionButtonDisabled={postSettingInfo.isSecret && !isValid}
      actionButtonName={postSettingInfo.isTemp ? '임시저장' : '업로드'}
      onActionButonClick={onUploadButonClick}
    >
      <div className="mb-5 h-36">
        <ImageUploader
          isEditMode={Boolean(editMode)}
          thumbnailPath={editMode?.post.thumbnailPath}
          setThumbnail={setThumbnail}
          setIsThumbnailChanged={setIsThumbnailChanged}
        />
      </div>
      <FormGroup>
        <span>
          <FormControlLabel
            control={
              <Checkbox checked={Boolean(postSettingInfo.isNotice)} name="isNotice" onChange={handleCheckBoxChange} />
            }
            label="공지"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(postSettingInfo.allowComment)}
                name="allowComment"
                onChange={handleCheckBoxChange}
              />
            }
            label="댓글 허용"
          />
        </span>
        <span className="flex">
          <FormControlLabel
            control={
              <Checkbox checked={Boolean(postSettingInfo.isSecret)} name="isSecret" onChange={handleCheckBoxChange} />
            }
            label="비밀글"
          />
          {postSettingInfo.isSecret && (
            <Controller
              name="password"
              defaultValue=""
              control={control}
              rules={{
                required: COMMON.error.required,
                maxLength: {
                  value: POST_PASSWORD_MAX_LENGTH,
                  message: COMMON.error.overMaxLen(POST_PASSWORD_MAX_LENGTH),
                },
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <StandardInput
                    {...field}
                    type="password"
                    placeholder="게시글 비밀번호"
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                );
              }}
            />
          )}
        </span>
        {postSettingInfo.isSecret && (
          <Typography variant="small" className="text-subOrange">
            *비밀글 제목은 목록에서 조회가 가능합니다.
          </Typography>
        )}
      </FormGroup>
    </ActionModal>
  );
};

export default SettingUploadModal;
