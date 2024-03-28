import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { Editor } from '@toast-ui/react-editor';
import { useRecoilValue } from 'recoil';
import { FileInfo, PostInfo, UploadPostSettings } from '@api/dto';
import {
  useAddFilesMutation,
  useDeleteFilesMutation,
  useEditPostMutation,
  useEditPostThumbnailMutation,
  useGetPostFilesQuery,
  useUploadPostMutation,
} from '@api/postApi';
import { COMMON } from '@constants/helperText';
import memberState from '@recoil/member.recoil';
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
      password: string;
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
  const [isThumbnailChanged, setIsThumbnailChanged] = useState(false);
  const [existingFiles, setExistingFiles] = useState<(File & { fileId: number })[]>([]);
  const [filesToAdd, setFilesToAdd] = useState<File[]>([]);
  const [fileIdsToDelete, setFileIdsToDelete] = useState<number[]>([]);
  const [settingModalOpen, setSettingModalOpen] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [contentErrMsg, setContentErrMsg] = useState('');

  const userInfo = useRecoilValue(memberState);
  const editorRef = useRef<Editor>();
  const navigate = useNavigate();
  const { mutate: uploadPostMutation } = useUploadPostMutation();
  const { mutate: editPost } = useEditPostMutation();
  const { mutate: editPostThumbnail } = useEditPostThumbnailMutation();
  const { mutate: editAddFiles } = useAddFilesMutation();
  const { mutate: editDeleteFiles } = useDeleteFilesMutation();
  const {
    control,
    getValues,
    formState: { isValid },
  } = useForm({ mode: 'onBlur' });

  if (editMode) {
    const { data: filesInfo } = useGetPostFilesQuery(editMode?.postId, true, editMode?.password);
    useEffect(() => {
      if (!filesInfo) return;
      setExistingFiles(filesInfo as any);
    }, [filesInfo]);
  }

  const handleEditorBlur = () => {
    const content = editorRef.current?.getInstance().getMarkdown();

    if (!content || content.length < 0) {
      setHasContent(false);
      setContentErrMsg(COMMON.error.required);
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
            if (isThumbnailChanged) {
              editPostThumbnail({ postId: editMode.postId, thumbnail });
            }

            if (filesToAdd.length > 0) {
              editAddFiles({ postId: editMode.postId, files: filesToAdd });
            }

            if (fileIdsToDelete.length > 0) {
              editDeleteFiles({ postId: editMode.postId, fileIds: fileIdsToDelete });
            }

            navigate(`/board/${categoryName}`);
          },
        },
      );
      return;
    }

    uploadPostMutation(
      {
        request: { categoryId, title: getValues('postTitle'), content, ...postSettingInfo },
        thumbnail,
        files: filesToAdd,
      },
      {
        onSuccess: () => {
          if (postSettingInfo.isTemp) {
            navigate(`/profile/${userInfo?.memberId}/board`);
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
      <div className="flex">
        <PageTitle>{categoryName}</PageTitle>
        {categoryName === '익명게시판' && (
          <Typography marginLeft={2} lineHeight={5} variant="small" className="text-subOrange">
            *익명 게시판은 글 수정/삭제, 임시저장이 불가합니다.
          </Typography>
        )}
      </div>
      <div className="mb-5 flex w-full items-center">
        <Stack className="w-full" flexDirection={{ sm: 'row' }}>
          <Typography fontWeight="semibold" className="!mr-2 pt-1">
            제목
          </Typography>
          <Controller
            name="postTitle"
            defaultValue={editMode ? editMode.post.title : ''}
            control={control}
            rules={{
              required: COMMON.error.required,
              maxLength: {
                value: POST_TITLE_MAX_LENGTH,
                message: COMMON.error.maxLength(POST_TITLE_MAX_LENGTH),
              },
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <StandardInput
                  className="w-full sm:w-[498px]"
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
          onChange={handleEditorBlur}
        />
        <Typography variant="small" className="text-subRed">
          {!hasContent && contentErrMsg}
        </Typography>
      </div>
      <Typography fontWeight="semibold" className="!mb-2 !mt-5">
        파일첨부
      </Typography>
      <div className="mb-5">
        <FileUploader
          existingFiles={existingFiles}
          setExistingFiles={setExistingFiles}
          files={filesToAdd}
          setFiles={setFilesToAdd}
          setFileIdsToDelete={setFileIdsToDelete}
        />
      </div>
      <div className="flex justify-end space-x-2">
        {!editMode && !(categoryName === '익명게시판') && (
          <OutlinedButton onClick={() => handleSaveButtonClick({ isTemp: true })} disabled={!isValid}>
            임시저장
          </OutlinedButton>
        )}
        <OutlinedButton onClick={() => handleSaveButtonClick({ isTemp: false })} disabled={!isValid || !hasContent}>
          {editMode ? '수정하기' : '작성완료'}
        </OutlinedButton>
      </div>
      <SettingUploadModal
        editMode={editMode}
        open={settingModalOpen}
        onClose={handleSettingModalClose}
        onUploadButonClick={handleUploadButonClick}
        postSettingInfo={postSettingInfo}
        setPostSettingInfo={setPostSettingInfo}
        setThumbnail={setThumbnail}
        setIsThumbnailChanged={setIsThumbnailChanged}
      />
    </div>
  );
};

export default BoardWrite;
