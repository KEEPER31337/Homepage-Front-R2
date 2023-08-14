import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Stack, Typography } from '@mui/material';
import { Editor } from '@toast-ui/react-editor';
import PageTitle from '@components/Typography/PageTitle';
import StandardInput from '@components/Input/StandardInput';
import StandardEditor from '@components/Editor/StandardEditor';
import FileUploader from '@components/Uploader/FileUploader';
import OutlinedButton from '@components/Button/OutlinedButton';
import { useUploadPostMutation } from '@api/postApi';
import { UploadPostSettings } from '@api/dto';
import { categoryNameToId } from '@utils/converter';
import { REQUIRE_ERROR_MSG } from '@constants/errorMsg';
import SettingUploadModal from './Modal/SettingUploadModal';

const POST_TITLE_MAX_LENGTH = 50;

const BoardWrite = () => {
  const { categoryName } = useParams();
  const categoryId = categoryName ? categoryNameToId(categoryName) : null;
  if (!categoryId) return null;

  const [postSettingInfo, setPostSettingInfo] = useState<UploadPostSettings>({
    isNotice: false,
    isSecret: false,
    isTemp: false,
    allowComment: true,
  });
  const [thumbnail, setThumbnail] = useState<Blob | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [settingModalOpen, setSettingModalOpen] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [contentErrMsg, setContentErrMsg] = useState('');

  const editorRef = useRef<Editor>();
  const navigate = useNavigate();
  const { mutate: uploadPostMutation } = useUploadPostMutation();
  const {
    control,
    getValues,
    formState: { isValid },
  } = useForm({ mode: 'onBlur' });

  const handleEditorBlur = () => {
    const content = editorRef.current?.getInstance().getMarkdown();

    if (!content || content.length < 0) {
      setHasContent(false);
      setContentErrMsg(REQUIRE_ERROR_MSG);
      return;
    }
    setHasContent(true);
  };

  const handleUploadButonClick = () => {
    const content = editorRef.current?.getInstance().getMarkdown() || '';

    // TODO 필수값 처리
    // TODO isTemp 여부에 따라 content 옵셔널 처리, 업로드 이후 동작 처리
    uploadPostMutation(
      { request: { categoryId, title: getValues('postTitle'), content, ...postSettingInfo }, thumbnail, files },
      {
        onSuccess: () => {
          navigate(`/board/${categoryName}`);
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
      <PageTitle>{categoryName}</PageTitle>
      <div className="mb-5 flex w-full items-center">
        <Stack flexDirection="row" marginRight={4}>
          <Typography fontWeight="semibold" className="!mr-2 pt-1">
            제목
          </Typography>
          <Controller
            name="postTitle"
            defaultValue=""
            control={control}
            rules={{
              required: REQUIRE_ERROR_MSG,
              maxLength: {
                value: POST_TITLE_MAX_LENGTH,
                message: `제목은 최대 ${POST_TITLE_MAX_LENGTH}글자 입력이 가능합니다.`,
              },
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <StandardInput
                  className="w-[498px]"
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                  autoFocus
                />
              );
            }}
          />
        </Stack>
      </div>
      <div>
        <StandardEditor
          height="470px"
          forwardedRef={editorRef as React.MutableRefObject<Editor>}
          onBlur={handleEditorBlur}
        />
        <Typography variant="small" className="text-subRed">
          {!hasContent && contentErrMsg}
        </Typography>
      </div>
      <Typography fontWeight="semibold" className="!mb-2 !mt-5">
        파일첨부
      </Typography>
      <div className="mb-5">
        <FileUploader files={files} setFiles={setFiles} />
      </div>
      <div className="flex justify-end space-x-2">
        <OutlinedButton onClick={() => handleSaveButtonClick({ isTemp: true })} disabled={!isValid}>
          임시저장
        </OutlinedButton>
        <OutlinedButton onClick={() => handleSaveButtonClick({ isTemp: false })} disabled={!isValid || !hasContent}>
          작성완료
        </OutlinedButton>
      </div>
      <SettingUploadModal
        open={settingModalOpen}
        onClose={handleSettingModalClose}
        onUploadButonClick={handleUploadButonClick}
        postSettingInfo={postSettingInfo}
        setPostSettingInfo={setPostSettingInfo}
        setThumbnail={setThumbnail}
      />
    </div>
  );
};

export default BoardWrite;
