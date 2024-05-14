import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import { Editor, EditorProps } from '@toast-ui/react-editor';
import Prism from 'prismjs';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'prismjs/themes/prism-tomorrow.css';

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
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      {...props}
    />
  );
};

export default StandardEditor;
