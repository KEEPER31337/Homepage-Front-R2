import React from 'react';
import { AdjacentPostInfo } from '@api/dto';
import { Button, Stack, Typography } from '@mui/material';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

interface AdjacentPostNavSectionProps {
  adjacentPosts: AdjacentPostInfo;
}

const AdjacentPostNavSection = ({ adjacentPosts }: AdjacentPostNavSectionProps) => {
  return (
    <section className="flex justify-between">
      <Button className="h-24 w-96 !justify-start !px-10" startIcon={<VscChevronLeft />}>
        <Stack textAlign="left">
          <Typography variant="small" fontWeight="semibold">
            이전글
          </Typography>
          <Typography color="white" fontWeight="semibold">
            {adjacentPosts.previous.title}
          </Typography>
        </Stack>
      </Button>
      <Button className="h-24 w-96 !justify-end !px-10" endIcon={<VscChevronRight />}>
        <Stack textAlign="right">
          <Typography variant="small" fontWeight="semibold">
            다음글
          </Typography>
          <Typography color="white" fontWeight="semibold">
            {adjacentPosts.next.title}
          </Typography>
        </Stack>
      </Button>
    </section>
  );
};

export default AdjacentPostNavSection;
