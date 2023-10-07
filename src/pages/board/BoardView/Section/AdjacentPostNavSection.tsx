import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { AdjacentPostInfo } from '@api/dto';

interface AdjacentPostNavSectionProps {
  previousPost: AdjacentPostInfo | null;
  nextPost: AdjacentPostInfo | null;
}

const AdjacentPostNavSection = ({ previousPost, nextPost }: AdjacentPostNavSectionProps) => {
  const navigate = useNavigate();

  const handlePreviousPostClick = () => {
    navigate(`/board/view/${previousPost?.postId}`);
  };

  const handleNextPostClick = () => {
    navigate(`/board/view/${nextPost?.postId}`);
  };

  return (
    <section className="flex flex-wrap justify-between gap-1">
      <div className="w-full sm:w-1/2">
        {previousPost && (
          <Button
            className="w-full !justify-start !bg-mainBlack/30 hover:!bg-mainBlack/70 sm:h-24 sm:w-96 sm:!px-10"
            startIcon={<VscChevronLeft />}
            onClick={handlePreviousPostClick}
          >
            <Stack textAlign="left" className="w-72">
              <Typography variant="small" fontWeight="semibold">
                이전글
              </Typography>
              <Typography color="white" fontWeight="semibold" className="truncate">
                {previousPost.title}
              </Typography>
            </Stack>
          </Button>
        )}
      </div>
      <div className="w-full sm:w-auto">
        {nextPost && (
          <Button
            className="w-full !justify-end !bg-mainBlack/30 hover:!bg-mainBlack/70 sm:h-24 sm:w-96 sm:!px-10"
            endIcon={<VscChevronRight />}
            onClick={handleNextPostClick}
          >
            <Stack textAlign="right" className="w-72">
              <Typography variant="small" fontWeight="semibold">
                다음글
              </Typography>
              <Typography color="white" fontWeight="semibold" className="truncate">
                {nextPost.title}
              </Typography>
            </Stack>
          </Button>
        )}
      </div>
    </section>
  );
};

export default AdjacentPostNavSection;
