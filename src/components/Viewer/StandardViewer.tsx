import React from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

interface StandardViewerProps {
  content: string;
  className?: string;
}

const StandardViewer = ({ content, className }: StandardViewerProps) => {
  return (
    <div className={className}>
      <Viewer initialValue={content} theme="dark" />
    </div>
  );
};

export default StandardViewer;
