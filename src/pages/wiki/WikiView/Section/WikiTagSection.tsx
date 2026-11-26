import React from 'react';
import { Link } from 'react-router-dom';
import { Chip } from '@mui/material';
import { VscTag } from 'react-icons/vsc';
import { WikiTag } from '@api/wikiDto';
import { KEEPER_COLOR } from '@constants/keeperTheme';

interface WikiTagSectionProps {
  tags: WikiTag[];
}

const WikiTagSection = ({ tags }: WikiTagSectionProps) => {
  if (tags.length === 0) return null;

  return (
    <section aria-label="태그" className="flex items-start gap-2 bg-mainBlack px-6 py-3 sm:px-14">
      <VscTag className="mt-1 shrink-0 fill-pointBlue" size={16} aria-hidden />
      <ul className="flex min-w-0 flex-wrap gap-1.5">
        {tags.map(({ tagId, name }) => (
          <li key={tagId} className="flex min-w-0">
            {/* NOTE @components/Chip/Chip과 같은 모양입니다. 그 Chip은 component(Link)의 props를 받지 못해 MUI Chip을 직접 씁니다. */}
            <Chip
              component={Link}
              to={`/wiki/tag/${tagId}`}
              label={name}
              size="small"
              clickable
              className="!max-w-full"
              sx={{
                bgcolor: `${KEEPER_COLOR.pointBlue}30`,
                color: 'white',
                fontWeight: 500,
                '&:hover, &.Mui-focusVisible': { bgcolor: `${KEEPER_COLOR.pointBlue}60` },
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WikiTagSection;
