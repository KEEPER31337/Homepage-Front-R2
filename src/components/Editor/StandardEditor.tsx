import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { HookMap } from '@toast-ui/editor';
import { Editor, EditorProps } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { useUploadPostImageMutation } from '@api/postApi';
import { getServerImgUrl } from '@utils/converter';

interface StandardEditorProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

const StandardEditor = ({ forwardedRef, ...props }: StandardEditorProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { mutate: uploadPostImageMutation } = useUploadPostImageMutation();

  const handleImageUpload: HookMap['addImageBlobHook'] = (blob, callback) => {
    // TODO: 이미지 크기가 30MB 넘어가면 에러 처리
    // TODO: 서버에서 이미지 받아오는 동안 딜레이 처리
    uploadPostImageMutation(
      { file: blob },
      {
        onSuccess: ({ filePath }) => {
          callback(getServerImgUrl(filePath));
        },
      },
    );
  };

  return (
    <Editor
      ref={forwardedRef}
      initialValue={props.initialValue ?? ''}
      placeholder="내용을 입력해주세요."
      hooks={{
        addImageBlobHook: handleImageUpload,
      }}
      previewStyle={isMobile ? 'tab' : 'vertical'}
      minHeight="300px"
      initialEditType={isMobile ? 'wysiwyg' : 'markdown'}
      language="ko"
      theme="dark"
      autofocus={false}
      {...props}
    />
  );
};

export default StandardEditor;
