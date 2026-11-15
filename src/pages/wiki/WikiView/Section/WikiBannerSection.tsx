import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip, Typography } from '@mui/material';
import { VscCalendar, VscHistory } from 'react-icons/vsc';
import { formatWikiDateTime } from '@utils/date';
import CommonAvatar from '@components/Avatar/CommonAvatar';
import OutlinedButton from '@components/Button/OutlinedButton';
import ProfileLink from '@components/Link/ProfileLink';
import { WikiViewModel } from '../WikiView.interface';

interface WikiBannerSectionProps {
  view: WikiViewModel;
  isRevisionMode: boolean;
}

const WikiBannerSection = ({ view, isRevisionMode }: WikiBannerSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-mainBlack px-6 py-2">
      <div className="mx-auto mt-10 max-w-xl text-center">
        <Chip className="mb-4 !rounded-md !bg-pointBlue/50" label="위키" />
        <Typography variant="h3" className="flex min-h-12 items-center justify-center break-all !font-semibold">
          {view.title}
        </Typography>
        <div className="flex flex-wrap items-center justify-center gap-x-2 text-small leading-8 text-gray-300">
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
            {formatWikiDateTime(view.editedAt)}
          </div>
          <div className="flex items-center justify-center">
            <VscHistory className="mr-1 h-4 w-4" />
            <span>r{view.revisionNo}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <OutlinedButton onClick={() => navigate(`/wiki/view/${view.docId}/revisions`)}>기록</OutlinedButton>
        {!isRevisionMode && <OutlinedButton onClick={() => navigate(`/wiki/write/${view.docId}`)}>편집</OutlinedButton>}
      </div>
    </div>
  );
};

export default WikiBannerSection;
