import React from 'react';
import toast from 'react-hot-toast';
import { useMediaQuery, useTheme } from '@mui/material';
import { HookMap } from '@toast-ui/editor';
import { Editor, EditorProps } from '@toast-ui/react-editor';
import { useUploadPostImageMutation } from '@api/postApi';
import { FILE, MAX_FILE_SIZE } from '@constants/apiResponseMessage';
import { getServerImgUrl } from '@utils/converter';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

interface StandardEditorProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

const StandardEditor = ({ forwardedRef, ...props }: StandardEditorProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { mutate: uploadPostImageMutation } = useUploadPostImageMutation();

  const handleImageUpload: HookMap['addImageBlobHook'] = (blob) => {
    if (blob.size > MAX_FILE_SIZE) {
      toast.error(FILE.error.exceedFileSize, {
        style: {
          maxWidth: 1500,
        },
      });
      return;
    }

    const editor = forwardedRef?.current.getInstance();
    if (!editor) return;

    const [startPos] = editor.getSelection();

    const IMAGE_MARKDOWN_LOADING_MSG = `![Uploading image...]()`;
    editor.insertText(`${IMAGE_MARKDOWN_LOADING_MSG}\n`);

    // selection 타입을 명확히 하여 마크다운 위치 계산
    const [startLinePos, startCharPos] = startPos as Exclude<typeof startPos, number>;
    const endPos = [startLinePos, startCharPos + IMAGE_MARKDOWN_LOADING_MSG.length] as Exclude<typeof startPos, number>;

    uploadPostImageMutation(
      { file: blob },
      {
        onSuccess: ({ fileName, filePath }) => {
          editor.replaceSelection(`![${fileName}](${getServerImgUrl(filePath)})`, startPos, endPos);
        },
        onError: () => {
          editor.deleteSelection(startPos, endPos);
          toast.error(FILE.error.uploadFail);
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
