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
    <section className="flex justify-between">
      <div>
        {previousPost && (
          <Button
            className="h-24 w-96 !justify-start !px-10"
            startIcon={<VscChevronLeft />}
            onClick={handlePreviousPostClick}
          >
            <Stack textAlign="left">
              <Typography variant="small" fontWeight="semibold">
                이전글
              </Typography>
              <Typography color="white" fontWeight="semibold">
                {previousPost.title}
              </Typography>
            </Stack>
          </Button>
        )}
      </div>
      <div>
        {nextPost && (
          <Button className="h-24 w-96 !justify-end !px-10" endIcon={<VscChevronRight />} onClick={handleNextPostClick}>
            <Stack textAlign="right">
              <Typography variant="small" fontWeight="semibold">
                다음글
              </Typography>
              <Typography color="white" fontWeight="semibold">
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
