import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { VscCalendar, VscHistory } from 'react-icons/vsc';
import { ReactComponent as LogoNeon } from '@assets/logo/logo_neon.svg';
import CommonAvatar from '@components/Avatar/CommonAvatar';
import OutlinedButton from '@components/Button/OutlinedButton';
import ProfileLink from '@components/Link/ProfileLink';
import type { WikiViewModel } from '../WikiView';

interface WikiBannerSectionProps {
  view: WikiViewModel;
  isRevisionMode: boolean;
}

const WikiBannerSection = ({ view, isRevisionMode }: WikiBannerSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-mainBlack px-6 py-2">
      <div className="pointer-events-none opacity-10" aria-hidden>
        <LogoNeon className="absolute inset-0 m-auto h-2/3 w-2/3" />
      </div>
      <div className="mx-auto mt-10 max-w-xl text-center">
        <Chip className="mb-4 !rounded-md !bg-pointBlue/50" label="위키" />
        <Typography variant="h3" className="flex min-h-12 items-center justify-center break-all !font-semibold">
          {view.title}
        </Typography>
      </div>
      <div className="sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-x-4">
        <div className="flex flex-wrap items-center justify-center gap-x-2 text-small leading-8 text-gray-300 sm:col-start-2">
          <div className="flex items-center justify-center">
            <ProfileLink
              memberId={view.editorId}
              underline={false}
              aria-label={`${view.editorName} 프로필`}
              className="mr-1 shrink-0"
            >
              <CommonAvatar className="!h-4 !w-4" userId={view.editorId} thumbnailPath={view.editorThumbnailPath} />
            </ProfileLink>
            <ProfileLink memberId={view.editorId}>{view.editorName}</ProfileLink>
          </div>
          <div className="flex items-center justify-center">
            <VscCalendar className="mr-1 h-4 w-4" />
            {DateTime.fromSQL(view.editedAt).toFormat('yyyy-MM-dd HH:mm')}
          </div>
          <div className="flex items-center justify-center">
            <VscHistory className="mr-1 h-4 w-4" />
            <span>r{view.revisionNo}</span>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          {!isRevisionMode && (
            <OutlinedButton onClick={() => navigate(`/wiki/write/${view.docId}`)}>편집</OutlinedButton>
          )}
          <OutlinedButton onClick={() => navigate(`/wiki/view/${view.docId}/revisions`)}>기록</OutlinedButton>
        </div>
      </div>
    </div>
  );
};

export default WikiBannerSection;
