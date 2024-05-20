import React, { useEffect, useRef } from 'react';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { Viewer } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

interface StandardViewerProps {
  content: string;
  className?: string;
}

const StandardViewer = ({ content, className }: StandardViewerProps) => {
  const viewerRef = useRef<Viewer>(null);

  useEffect(() => {
    viewerRef.current?.getInstance().setMarkdown(content);
  }, [content]);

  return (
    <div className={className}>
      <Viewer
        ref={viewerRef}
        initialValue={content}
        theme="dark"
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </div>
  );
};

export default StandardViewer;
