import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';
import ImageUploader from '@components/Uploader/ImageUploader';

interface SettingUploadModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingUploadModal = ({ open, onClose }: SettingUploadModalProps) => {
  const [, setThumbnail] = useState<Blob>();

  const handleActionButonClick = () => {
    // TODO
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="설정 확인 및 업로드"
      actionButtonName="업로드"
      onActionButonClick={handleActionButonClick}
    >
      <div className="mb-5 h-36">
        <ImageUploader isEdit={false} setThumbnail={setThumbnail} />
      </div>
      <FormGroup>
        <span>
          <FormControlLabel control={<Checkbox />} label="공지" />
          <FormControlLabel control={<Checkbox />} label="댓글 허용" />
        </span>
        <span className="flex items-center">
          <FormControlLabel control={<Checkbox />} label="비밀글" />
          {/* TODO 비밀글 체크 시에만 렌더링 되도록 처리 */}
          <StandardInput
            value=""
            type="password"
            placeholder="게시글 비밀번호"
            onChange={() => {
              // TODO
            }}
          />
        </span>
      </FormGroup>
    </ActionModal>
  );
};

export default SettingUploadModal;
