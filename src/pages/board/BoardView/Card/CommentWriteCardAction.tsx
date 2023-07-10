import React from 'react';
import { StandardTextFieldProps, TextField } from '@mui/material';
import OutlinedButton from '@components/Button/OutlinedButton';

interface CommentWriteCardActionProps {
  textFieldProps?: StandardTextFieldProps;
  onWriteButtonClick: () => void;
}

const CommentWriteCardAction = ({ textFieldProps, onWriteButtonClick }: CommentWriteCardActionProps) => {
  return (
    <div className="w-full space-y-4 p-1">
      <TextField className="bg-mainBlack" fullWidth multiline rows={4} {...textFieldProps} />
      <div className="flex justify-end">
        <OutlinedButton onClick={onWriteButtonClick}>댓글 작성</OutlinedButton>
      </div>
    </div>
  );
};

export default CommentWriteCardAction;
