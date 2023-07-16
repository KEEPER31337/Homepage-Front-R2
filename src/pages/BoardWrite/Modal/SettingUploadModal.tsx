import React from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import StandardInput from '@components/Input/StandardInput';

const SettingUploadModal = () => {
  return (
    <div>
      <FormGroup className="flex !flex-row">
        <FormControlLabel control={<Checkbox />} label="공지" />
        <FormControlLabel control={<Checkbox />} label="비밀글" />
      </FormGroup>
      {/* TODO 비밀글 체크 시에만 렌더링 되도록 처리 */}
      <StandardInput
        className="w-32"
        value=""
        type="password"
        placeholder="게시글 비밀번호"
        onChange={() => {
          // TODO
        }}
      />
    </div>
  );
};

export default SettingUploadModal;
