import React, { useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

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
      <Viewer ref={viewerRef} initialValue={content} theme="dark" />
    </div>
  );
};

export default StandardViewer;
