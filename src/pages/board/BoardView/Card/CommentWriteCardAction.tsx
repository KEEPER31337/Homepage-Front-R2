import React from 'react';
import { StandardTextFieldProps, TextField, useMediaQuery, useTheme } from '@mui/material';
import OutlinedButton from '@components/Button/OutlinedButton';

interface CommentWriteCardActionProps {
  textFieldProps?: StandardTextFieldProps;
  writeButtonName: string;
  onWriteButtonClick: () => void;
}

const CommentWriteCardAction = ({
  textFieldProps,
  writeButtonName,
  onWriteButtonClick,
}: CommentWriteCardActionProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="w-full space-y-4 p-1">
      <TextField className="bg-mainBlack" fullWidth multiline rows={isMobile ? 2 : 4} {...textFieldProps} />
      <div className="flex justify-end">
        <OutlinedButton small={isMobile} onClick={onWriteButtonClick}>
          {writeButtonName}
        </OutlinedButton>
      </div>
    </div>
  );
};

export default CommentWriteCardAction;
