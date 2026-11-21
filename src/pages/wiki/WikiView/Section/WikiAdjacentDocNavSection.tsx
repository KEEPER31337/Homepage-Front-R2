import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { WikiAdjacentDocument } from '@api/wikiDto';

interface WikiAdjacentDocNavSectionProps {
  previousDoc: WikiAdjacentDocument | null;
  nextDoc: WikiAdjacentDocument | null;
}

/* NOTE 게시글의 이전글/다음글(AdjacentPostNavSection)과 같은 모양으로 맞췄습니다. */
const WikiAdjacentDocNavSection = ({ previousDoc, nextDoc }: WikiAdjacentDocNavSectionProps) => {
  if (!previousDoc && !nextDoc) return null;

  return (
    <section className="flex flex-wrap justify-between gap-1">
      <div className="w-full sm:w-1/2">
        {previousDoc && (
          <Button
            component={Link}
            to={`/wiki/view/${previousDoc.docId}`}
            className="w-full !justify-start !bg-mainBlack/30 hover:!bg-mainBlack/70 sm:h-24 sm:w-96 sm:!px-10"
            startIcon={<VscChevronLeft />}
          >
            <Stack textAlign="left" className="w-72">
              <Typography variant="small" fontWeight="semibold">
                이전 문서
              </Typography>
              <Typography color="white" fontWeight="semibold" className="truncate normal-case">
                {previousDoc.title}
              </Typography>
            </Stack>
          </Button>
        )}
      </div>
      <div className="w-full sm:w-auto">
        {nextDoc && (
          <Button
            component={Link}
            to={`/wiki/view/${nextDoc.docId}`}
            className="w-full !justify-end !bg-mainBlack/30 hover:!bg-mainBlack/70 sm:h-24 sm:w-96 sm:!px-10"
            endIcon={<VscChevronRight />}
          >
            <Stack textAlign="right" className="w-72">
              <Typography variant="small" fontWeight="semibold">
                다음 문서
              </Typography>
              <Typography color="white" fontWeight="semibold" className="truncate normal-case">
                {nextDoc.title}
              </Typography>
            </Stack>
          </Button>
        )}
      </div>
    </section>
  );
};

export default WikiAdjacentDocNavSection;
