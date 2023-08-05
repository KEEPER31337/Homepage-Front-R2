import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';
import ImageUploader from '@components/Uploader/ImageUploader';
import { UploadPostSettings } from '@api/dto';

interface SettingUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUploadButonClick: () => void;
  postSettingInfo: UploadPostSettings;
  setPostSettingInfo: React.Dispatch<React.SetStateAction<UploadPostSettings>>;
}

const SettingUploadModal = ({
  open,
  onClose,
  onUploadButonClick,
  postSettingInfo,
  setPostSettingInfo,
}: SettingUploadModalProps) => {
  const [, setThumbnail] = useState<Blob>();

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPostSettingInfo((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSecretPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostSettingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title={`설정 확인 및 ${postSettingInfo.isTemp ? '임시저장' : '업로드'}`}
      actionButtonName={postSettingInfo.isTemp ? '임시저장' : '업로드'}
      onActionButonClick={onUploadButonClick}
    >
      <div className="mb-5 h-36">
        <ImageUploader isEdit={false} setThumbnail={setThumbnail} />
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
        <span className="flex items-center">
          <FormControlLabel
            control={
              <Checkbox checked={Boolean(postSettingInfo.isSecret)} name="isSecret" onChange={handleCheckBoxChange} />
            }
            label="비밀글"
          />
          {postSettingInfo.isSecret && (
            <StandardInput
              name="password"
              value={postSettingInfo.password || ''}
              type="password"
              placeholder="게시글 비밀번호"
              onChange={handleSecretPasswordChange}
            />
          )}
        </span>
      </FormGroup>
    </ActionModal>
  );
};

export default SettingUploadModal;
