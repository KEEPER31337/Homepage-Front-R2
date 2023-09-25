import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { Editor, EditorProps } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

interface StandardEditorProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

const StandardEditor = ({ forwardedRef, ...props }: StandardEditorProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Editor
      ref={forwardedRef}
      initialValue={props.initialValue ?? ''}
      placeholder="내용을 입력해주세요."
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
