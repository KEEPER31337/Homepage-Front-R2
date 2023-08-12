import React, { useRef, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { Editor } from '@toast-ui/react-editor';
import PageTitle from '@components/Typography/PageTitle';
import StandardInput from '@components/Input/StandardInput';
import StandardEditor from '@components/Editor/StandardEditor';
import FileUploader from '@components/Uploader/FileUploader';
import OutlinedButton from '@components/Button/OutlinedButton';
import useUploadPostMutation from '@api/postApi';
import { UploadPostSettings } from '@api/dto';
import { useNavigate } from 'react-router-dom';
import SettingUploadModal from './Modal/SettingUploadModal';

const BoardWrite = () => {
  const boardName = '자유게시판'; // TODO 게시판 이름 불러오기
  const categoryId = 104; // TODO 게시판 ID 연결하기

  const [postTitle, setPostTitle] = useState('');
  const [postSettingInfo, setPostSettingInfo] = useState<UploadPostSettings>({
    isNotice: false,
    isSecret: false,
    isTemp: false,
    allowComment: false,
  });
  const [settingModalOpen, setSettingModalOpen] = useState(false);

  const editorRef = useRef<Editor>();
  const navigate = useNavigate();
  const { mutate: uploadPostMutation } = useUploadPostMutation();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  };

  const handleUploadButonClick = () => {
    const content = editorRef.current?.getInstance().getMarkdown() || '';

    // TODO 필수값 처리
    // TODO isTemp 여부에 따라 content 옵셔널 처리, 업로드 이후 동작 처리
    uploadPostMutation(
      { categoryId, title: postTitle, content, ...postSettingInfo },
      {
        onSuccess: () => {
          navigate('/board/list');
        },
      },
    );
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
          <StandardInput className="w-[498px]" value={postTitle} onChange={handleTitleChange} />
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
