import React from 'react';
import { Typography } from '@mui/material';
import CustomBadge from '@components/Badge/CustomBadge';

const CommentSection = () => {
  const commentCount = 5; // TODO

  return (
    <div>
      <div className="flex items-center">
        <Typography variant="h3" fontWeight="bold" marginRight={1}>
          댓글
        </Typography>
        <CustomBadge>{commentCount}</CustomBadge>
      </div>
    </div>
  );
};

export default CommentSection;
