import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { Editor } from '@toast-ui/react-editor';
import { PostInfo, UploadPostSettings } from '@api/dto';
import { useEditPostMutation, useUploadPostMutation } from '@api/postApi';
import { REQUIRE_ERROR_MSG } from '@constants/errorMsg';
import { categoryNameToId } from '@utils/converter';
import OutlinedButton from '@components/Button/OutlinedButton';
import StandardEditor from '@components/Editor/StandardEditor';
import StandardInput from '@components/Input/StandardInput';
import PageTitle from '@components/Typography/PageTitle';
import FileUploader from '@components/Uploader/FileUploader';
import SettingUploadModal from './Modal/SettingUploadModal';

const POST_TITLE_MAX_LENGTH = 50;

const BoardWrite = () => {
  const { categoryName } = useParams();
  const {
    state: editMode,
  }: {
    state: {
      postId: number;
      post: PostInfo;
    } | null;
  } = useLocation();

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
  const { mutate: editPost } = useEditPostMutation();
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

    if (editMode) {
      editPost(
        {
          postId: editMode.postId,
          editPostInfo: { title: getValues('postTitle'), content, ...postSettingInfo },
        },
        {
          onSuccess: () => {
            navigate(`/board/${categoryName}`);
          },
        },
      );
      return;
    }

    uploadPostMutation(
      { request: { categoryId, title: getValues('postTitle'), content, ...postSettingInfo }, thumbnail, files },
      {
        onSuccess: () => {
          if (postSettingInfo.isTemp) {
            navigate(`/profile#board`);
            return;
          }
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

  useEffect(() => {
    if (!editMode) return;
    setPostSettingInfo({
      isNotice: editMode.post.isNotice,
      isSecret: editMode.post.isSecret,
      isTemp: editMode.post.isTemp,
      allowComment: editMode.post.allowComment,
    });
  }, []);

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
            defaultValue={editMode ? editMode.post.title : ''}
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
          initialValue={editMode?.post.content}
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
        {!editMode && (
          <OutlinedButton onClick={() => handleSaveButtonClick({ isTemp: true })} disabled={!isValid}>
            임시저장
          </OutlinedButton>
        )}
        <OutlinedButton onClick={() => handleSaveButtonClick({ isTemp: false })} disabled={!isValid || !hasContent}>
          {editMode ? '수정하기' : '작성완료'}
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
