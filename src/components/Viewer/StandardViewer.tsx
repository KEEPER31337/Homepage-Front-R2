import React, { useLayoutEffect, useRef } from 'react';
import ToastViewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';

import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'prismjs/themes/prism-tomorrow.css';

interface StandardViewerProps {
  content: string;
  className?: string;
}

const StandardViewer = ({ content, className }: StandardViewerProps) => {
  const viewerElementRef = useRef<HTMLDivElement>(null);
  const viewerInstanceRef = useRef<ToastViewer | null>(null);

  useLayoutEffect(() => {
    if (!viewerElementRef.current) return undefined;

    const viewerElement = viewerElementRef.current;
    const viewer = new ToastViewer({
      el: viewerElement,
      initialValue: '',
      theme: 'dark',
      plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
    });
    viewerInstanceRef.current = viewer;

    return () => {
      viewer.destroy();
      viewerElement.replaceChildren();
      viewerInstanceRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    viewerInstanceRef.current?.setMarkdown(content);
  }, [content]);

  return (
    <div className={className}>
      <div ref={viewerElementRef} />
    </div>
  );
};

export default StandardViewer;
