import React, { useReducer, useState } from 'react';
import { Button } from '@mui/material';
import { VscArrowDown, VscArrowUp, VscFolder, VscFolderOpened } from 'react-icons/vsc';
import { PostInfo } from '@api/dto';
import {
  useGetPostFilesQuery,
  useControlPostLikesMutation,
  useControlPostDislikesMutation,
  useDownloadFileMutation,
} from '@api/postApi';
import FilledButton from '@components/Button/FilledButton';
import OutlinedButton from '@components/Button/OutlinedButton';
import FileViewer from '@components/Viewer/FileViewer';
import StandardViewer from '@components/Viewer/StandardViewer';
import WarningDeductPointModal from '../Modal/WarningDeductPointModal';

interface PostSectionProps {
  postId: number;
  post: PostInfo;
}

const PostSection = ({ postId, post }: PostSectionProps) => {
  const [fileOpen, toggleFileOpen] = useReducer((prev) => !prev, false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);

  const { data: files } = useGetPostFilesQuery(postId, fileOpen);
  const { mutate: controlLikes } = useControlPostLikesMutation();
  const { mutate: controlDislikes } = useControlPostDislikesMutation();
  const { mutate: downloadFile } = useDownloadFileMutation();

  const handleFileOpenButtonClick = () => {
    if (post.categoryName === '시험게시판') {
      setWarningModalOpen(true);
      return;
    }

    toggleFileOpen();
  };

  const handleWarningModalActionClick = () => {
    setWarningModalOpen(false);
    toggleFileOpen();
  };

  const handleDownloadFileClick = (fileId: number, fileName: string) => {
    downloadFile({ postId, fileId, fileName });
  };

  const handleLikeButtonClick = () => {
    controlLikes(postId);
  };

  const handleDisikeButtonClick = () => {
    controlDislikes(postId);
  };

  return (
    <div className="min-h-[520px] bg-middleBlack px-14 py-10">
      <StandardViewer className="mb-4 min-h-[330px]" content={post.content} />
      <Button
        className="hover:!bg-transparent"
        variant="text"
        onClick={handleFileOpenButtonClick}
        startIcon={fileOpen ? <VscFolderOpened /> : <VscFolder />}
      >
        첨부파일
      </Button>
      {fileOpen && (
        <div className="mb-10 mt-2 flex justify-end gap-3 text-pointBlue">
          {files && <FileViewer files={files} onRowClick={handleDownloadFileClick} />}
        </div>
      )}
      <div className="mt-8 flex items-center justify-center space-x-2">
        {post.isLike ? (
          <FilledButton small onClick={handleLikeButtonClick}>
            <VscArrowUp className="mr-1" size={10} />
            <span>추천 ({post.likeCount})</span>
          </FilledButton>
        ) : (
          <OutlinedButton small onClick={handleLikeButtonClick}>
            <VscArrowUp className="mr-1" size={10} />
            <span>추천 ({post.likeCount})</span>
          </OutlinedButton>
        )}
        {post.isDislike ? (
          <FilledButton small onClick={handleDisikeButtonClick}>
            <VscArrowDown className="mr-1" size={10} />
            <span>비추천 ({post.dislikeCount})</span>
          </FilledButton>
        ) : (
          <OutlinedButton small onClick={handleDisikeButtonClick}>
            <VscArrowDown className="mr-1" size={10} />
            <span>비추천 ({post.dislikeCount})</span>
          </OutlinedButton>
        )}
      </div>
      {post.categoryName === '시험게시판' && (
        <WarningDeductPointModal
          open={warningModalOpen}
          onClose={() => setWarningModalOpen(false)}
          onActionButonClick={handleWarningModalActionClick}
        />
      )}
    </div>
  );
};

export default PostSection;
