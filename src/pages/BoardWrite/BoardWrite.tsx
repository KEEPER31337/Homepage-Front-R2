import React, { useRef, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { Editor } from '@toast-ui/react-editor';
import PageTitle from '@components/Typography/PageTitle';
import StandardInput from '@components/Input/StandardInput';
import StandardEditor from '@components/Editor/StandardEditor';
import FileUploader from '@components/Uploader/FileUploader';
import OutlinedButton from '@components/Button/OutlinedButton';
import { UploadPostSettings } from '@api/dto';
import SettingUploadModal from './Modal/SettingUploadModal';

const BoardWrite = () => {
  const boardName = '자유게시판'; // TODO 게시판 이름 불러오기
  const editorRef = useRef<Editor>();
  const [postSettingInfo, setPostSettingInfo] = useState<UploadPostSettings | null>(null);
  const [settingModalOpen, setSettingModalOpen] = useState(false);

  const handleUploadButonClick = () => {
    // TODO
  };

  const handleSaveButtonClick = ({ isTemp }: { isTemp: boolean }) => {
    setSettingModalOpen(true);
    setPostSettingInfo((prev) => ({
      ...prev,
      isTemp,
    }));
  };

  const handleSettingModalClose = () => {
    setSettingModalOpen(false);
  };

  return (
    <div>
      <PageTitle>{boardName}</PageTitle>
      <div className="mb-5 flex w-full items-center">
        <Stack flexDirection="row" marginRight={4} alignItems="center">
          <Typography fontWeight="semibold" className="!mr-2">
            제목
          </Typography>
          <StandardInput
            className="w-[498px]"
            value=""
            onChange={() => {
              // TODO
            }}
          />
        </Stack>
      </div>
      <StandardEditor height="470px" forwardedRef={editorRef as React.MutableRefObject<Editor>} />
      <Typography fontWeight="semibold" className="!mb-2 !mt-5">
        파일첨부
      </Typography>
      <div className="mb-5">
        <FileUploader />
      </div>
      <div className="flex justify-end space-x-2">
        <OutlinedButton onClick={() => handleSaveButtonClick({ isTemp: true })}>임시저장</OutlinedButton>
        <OutlinedButton onClick={() => handleSaveButtonClick({ isTemp: false })}>작성완료</OutlinedButton>
      </div>
      <SettingUploadModal
        open={settingModalOpen}
        onClose={handleSettingModalClose}
        onUploadButonClick={handleUploadButonClick}
        postSettingInfo={postSettingInfo}
        setPostSettingInfo={setPostSettingInfo}
      />
    </div>
  );
};

export default BoardWrite;
