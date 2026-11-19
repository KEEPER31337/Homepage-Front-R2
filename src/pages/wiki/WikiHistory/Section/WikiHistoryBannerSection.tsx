import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip, Typography } from '@mui/material';
import { VscHistory } from 'react-icons/vsc';
import OutlinedButton from '@components/Button/OutlinedButton';

interface WikiHistoryBannerSectionProps {
  docId: number;
  title?: string;
  totalRevisions?: number;
  canEdit: boolean;
}

const WikiHistoryBannerSection = ({ docId, title, totalRevisions, canEdit }: WikiHistoryBannerSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-mainBlack px-6 py-2">
      <div className="mx-auto mt-10 max-w-xl text-center">
        <Chip className="mb-4 !rounded-md !bg-pointBlue/50" label="위키" />
        <Typography variant="h3" className="flex min-h-12 items-center justify-center break-all !font-semibold">
          {title}
        </Typography>
        <div className="flex items-center justify-center text-small leading-8 text-gray-300">
          <VscHistory className="mr-1 h-4 w-4" />
          <span>
            문서 기록
            {totalRevisions !== undefined && ` · 리비전 ${totalRevisions.toLocaleString()}개`}
          </span>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <OutlinedButton onClick={() => navigate(`/wiki/view/${docId}`)}>본문</OutlinedButton>
        {canEdit && <OutlinedButton onClick={() => navigate(`/wiki/write/${docId}`)}>편집</OutlinedButton>}
      </div>
    </div>
  );
};

export default WikiHistoryBannerSection;
