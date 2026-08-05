import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip as MuiChip,
  CircularProgress,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { VscChevronDown } from 'react-icons/vsc';

import { useGetVoteListQuery } from '@api/voteApi';
import { VoteParticipationStatus } from '@api/voteDto';
import FilledButton from '@components/Button/FilledButton';
import Selector from '@components/Selector/Selector';
import PageTitle from '@components/Typography/PageTitle';
import { formatVoteDateTime } from '@utils/date';

const CURRENT_YEAR = DateTime.now().year;

const yearList = Array.from({ length: 5 }, (_, index) => ({
  id: CURRENT_YEAR - index,
  content: `${CURRENT_YEAR - index}년`,
}));

const participationLabels: Record<VoteParticipationStatus, string> = {
  1: '참여 가능',
  2: '참여 권한 없음',
  3: '이미 참여한 투표',
  4: '투표 기간이 아님',
};

const isVoteEnded = (endAt: string) => {
  const parsedEndAt = DateTime.fromISO(endAt);

  return parsedEndAt.isValid && DateTime.now().toMillis() >= parsedEndAt.toMillis();
};

const VoteList = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const { data: votes = [], isPending, isError } = useGetVoteListQuery(selectedYear);

  const handleYearChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedYear(Number(event.target.value));
  };

  let content: React.ReactNode;

  if (isPending) {
    content = (
      <div className="flex justify-center py-24">
        <CircularProgress />
      </div>
    );
  } else if (isError) {
    content = (
      <Typography marginY={15} paddingY={8} textAlign="center" className="border-y border-pointBlue/70">
        투표 목록을 불러오지 못했습니다.
      </Typography>
    );
  } else if (votes.length === 0) {
    content = (
      <Typography marginY={15} paddingY={8} textAlign="center" className="border-y border-pointBlue/70">
        현재 등록된 투표가 없습니다.
      </Typography>
    );
  } else {
    content = votes.map((vote) => (
      <Accordion key={vote.id} TransitionProps={{ mountOnEnter: true }} className="!shadow-none">
        <AccordionSummary
          className="!border-b !border-white/[20%] !bg-subBlack !px-4 !py-2 !text-white hover:!bg-subGray hover:!text-white focus:!outline-0"
          expandIcon={<VscChevronDown />}
        >
          <div className="flex min-h-20 w-full flex-col justify-between gap-2 px-2 py-2 sm:flex-row sm:items-center">
            <div className="min-w-0 space-y-2">
              <Typography variant="h3" fontWeight="semiBold">
                {vote.title}
              </Typography>
              <Typography className="!text-sm text-white/60">
                {formatVoteDateTime(vote.startAt)} ~ {formatVoteDateTime(vote.endAt)}
              </Typography>
            </div>
            {vote.participated !== 4 && (
              <MuiChip
                className="!shrink-0 self-end !rounded !bg-pointBlue/30 !font-medium !text-white sm:self-auto"
                label="투표 중"
                size="small"
              />
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails className="!bg-middleBlack !px-[41px] !py-[30px] !text-white">
          <div className="space-y-8">
            <div className="space-y-2">
              <Typography className="font-semibold">투표 안내</Typography>
              <Typography className="border-l-2 border-pointBlue px-2">
                {vote.description ?? '등록된 투표 안내가 없습니다.'}
              </Typography>
            </div>
            <div className="space-y-2">
              <Typography className="font-semibold">참여 여부</Typography>
              <Typography className="border-l-2 border-pointBlue px-2">
                {participationLabels[vote.participated]}
              </Typography>
            </div>
            <div className="flex justify-end">
              {isVoteEnded(vote.endAt) ? (
                <FilledButton onClick={() => navigate(`/vote/${vote.id}/result`)}>결과 보기</FilledButton>
              ) : (
                <FilledButton
                  className="disabled:!bg-subGray disabled:!text-white/60"
                  disabled={vote.participated !== 1}
                  onClick={() => navigate(`/vote/${vote.id}`)}
                >
                  투표하기
                </FilledButton>
              )}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    ));
  }

  return (
    <div>
      <PageTitle>투표</PageTitle>
      <div className="mb-6 flex items-center">
        <div className="flex space-x-2">
          <Selector className="w-28" name="year" options={yearList} value={selectedYear} onChange={handleYearChange} />
        </div>
      </div>

      {content}
    </div>
  );
};

export default VoteList;
