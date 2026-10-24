import React from 'react';
import toast from 'react-hot-toast';
import { useMediaQuery, useTheme } from '@mui/material';
import ToastEditor, { HookMap } from '@toast-ui/editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';
import './prismLang';
import { useUploadPostImageMutation } from '@api/postApi';
import { FILE, MAX_FILE_SIZE } from '@constants/apiResponseMessage';
import { getServerImgUrl } from '@utils/converter';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import 'prismjs/themes/prism-tomorrow.css';

interface StandardEditorProps {
  forwardedRef?: React.MutableRefObject<StandardEditorHandle | null>;
  height?: string;
  initialValue?: string;
  onChange?: () => void;
}

interface StandardEditorHandle {
  getInstance: () => ToastEditor;
}

const TOAST_UI_TOOLBAR_ICON_SELECTOR = '.toastui-editor-toolbar-icons';

const findToastUiToolbarIconSprite = () => {
  for (const styleSheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(styleSheet.cssRules)) {
        if (
          typeof CSSStyleRule !== 'undefined' &&
          rule instanceof CSSStyleRule &&
          rule.selectorText === TOAST_UI_TOOLBAR_ICON_SELECTOR &&
          rule.style.backgroundImage.includes('url(')
        ) {
          return {
            backgroundImage: rule.style.backgroundImage,
            backgroundSize: rule.style.backgroundSize,
          };
        }
      }
    } catch {
      // External stylesheets such as font imports may block cssRules access.
    }
  }

  return null;
};

const StandardEditor = ({ forwardedRef, height, initialValue = '', onChange }: StandardEditorProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const editorWrapperRef = React.useRef<HTMLDivElement>(null);
  const editorElementRef = React.useRef<HTMLDivElement>(null);
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  const { mutate: uploadPostImageMutation } = useUploadPostImageMutation();

  React.useLayoutEffect(() => {
    const iconSprite = findToastUiToolbarIconSprite();
    if (!iconSprite || !editorWrapperRef.current) return;

    editorWrapperRef.current.style.setProperty('--toastui-editor-toolbar-icon-image', iconSprite.backgroundImage);
    editorWrapperRef.current.style.setProperty('--toastui-editor-toolbar-icon-size', iconSprite.backgroundSize);
  }, []);

  const handleImageUpload = React.useCallback<NonNullable<HookMap['addImageBlobHook']>>(
    (blob, callback) => {
      if (blob.size > MAX_FILE_SIZE) {
        toast.error(FILE.error.exceedFileSize, {
          style: {
            maxWidth: 1500,
          },
        });
        return;
      }

      // getSelection 위치 형식이 모드마다 달라 직접 삽입하지 않고, 현재 모드에 맞게 삽입해주는 callback 사용
      uploadPostImageMutation(
        { file: blob },
        {
          onSuccess: ({ fileName, filePath }) => {
            callback(getServerImgUrl(filePath), fileName);
          },
          onError: () => {
            toast.error(FILE.error.uploadFail);
          },
        },
      );
    },
    [uploadPostImageMutation],
  );

  React.useLayoutEffect(() => {
    if (!editorElementRef.current) return undefined;

    const editor = new ToastEditor({
      el: editorElementRef.current,
      initialValue,
      placeholder: '내용을 입력해주세요.',
      hooks: {
        addImageBlobHook: handleImageUpload,
      },
      events: {
        change: () => onChangeRef.current?.(),
      },
      previewStyle: isMobile ? 'tab' : 'vertical',
      height,
      minHeight: '300px',
      initialEditType: isMobile ? 'wysiwyg' : 'markdown',
      language: 'ko',
      theme: 'dark',
      autofocus: false,
      plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
    });

    if (forwardedRef) {
      forwardedRef.current = { getInstance: () => editor };
    }

    return () => {
      editor.destroy();
      if (forwardedRef) forwardedRef.current = null;
    };
  }, [forwardedRef, handleImageUpload, height, initialValue, isMobile]);

  return (
    <div ref={editorWrapperRef} data-standard-editor>
      <style>
        {`
          [data-standard-editor] button.toastui-editor-toolbar-icons {
            background-image: var(--toastui-editor-toolbar-icon-image);
            background-size: var(--toastui-editor-toolbar-icon-size);
          }
        `}
      </style>
      <div ref={editorElementRef} />
    </div>
  );
};

export default StandardEditor;
export type { StandardEditorHandle };
