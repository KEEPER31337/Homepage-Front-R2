import React from 'react';
import { GoKebabHorizontal } from 'react-icons/go';
import { VscEdit, VscTrash } from 'react-icons/vsc';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';

const CommentMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const commentMenuOpen = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditCommentClick = () => {
    // TODO
  };

  const handleDeleteCommentClick = () => {
    // TODO
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={commentMenuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={commentMenuOpen ? 'true' : undefined}
        onClick={handleMenuClick}
      >
        <GoKebabHorizontal className="fill-subGray" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={commentMenuOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleEditCommentClick}>
          <VscEdit className="mr-2" />
          <Typography>댓글 수정</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteCommentClick}>
          <VscTrash className="mr-2 fill-subRed" />
          <Typography className="text-subRed">댓글 삭제</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default CommentMenu;
