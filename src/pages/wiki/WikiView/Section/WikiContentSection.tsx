import React from 'react';
import { Typography } from '@mui/material';
import StandardViewer from '@components/Viewer/StandardViewer';

interface WikiContentSectionProps {
  content: string;
}

const WikiContentSection = ({ content }: WikiContentSectionProps) => {
  const isEmpty = content.trim() === '';

  return (
    <div className="min-h-[500px] bg-middleBlack px-6 pb-8 pt-3 sm:px-14 sm:py-10">
      {isEmpty ? (
        <Typography className="text-subGray">내용이 없습니다.</Typography>
      ) : (
        <StandardViewer className="min-h-[380px]" content={content} />
      )}
    </div>
  );
};

export default WikiContentSection;
