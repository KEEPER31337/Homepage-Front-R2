import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import { DateTime } from 'luxon';

import { useGetVoteQuery, useParticipateVoteMutation } from '@api/voteApi';
import FilledButton from '@components/Button/FilledButton';
import OutlinedButton from '@components/Button/OutlinedButton';
import PageTitle from '@components/Typography/PageTitle';
import VoteAgenda from './VoteAgenda';
import useVoteState, { getSelectedOptionIds } from './useVoteState';

const formatVoteDateTime = (dateTime: string) => {
  const parsedDateTime = DateTime.fromISO(dateTime);

  return parsedDateTime.isValid ? parsedDateTime.toFormat('yyyy.MM.dd HH:mm') : dateTime;
};

const Vote = () => {
  const navigate = useNavigate();
  const { voteId } = useParams();
  const parsedVoteId = Number(voteId);
  const { data: vote, isPending, isError } = useGetVoteQuery({ voteId: parsedVoteId });
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [currentAgendaTabIndex, setCurrentAgendaTabIndex] = useState(0);
  const [voteState, voteDispatch] = useVoteState();
  const [receiptToken] = useState(() => crypto.randomUUID());
  const { mutate: participateVote, isPending: isParticipationPending } = useParticipateVoteMutation(parsedVoteId);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentAgendaTabIndex(newValue);
  };

  if (isError) {
    return (
      <div>
        <PageTitle>투표</PageTitle>
        <div className="space-y-6 border-y border-pointBlue/70 py-16 text-center">
          <Typography>투표 정보를 불러올 수 없습니다.</Typography>
          <OutlinedButton onClick={() => navigate('/vote')}>목록으로</OutlinedButton>
        </div>
      </div>
    );
  }

  if (isPending || !vote) {
    return (
      <div>
        <PageTitle>투표</PageTitle>
        <div className="flex justify-center py-24">
          <CircularProgress />
        </div>
      </div>
    );
  }

  const isFirstAgenda = currentAgendaTabIndex === 0;
  const isLastAgenda = currentAgendaTabIndex === vote.agendas.length - 1;
  const canSubmit = vote.agendas.every(({ id, minSelect, maxSelect }) => {
    const selectionCount = getSelectedOptionIds(voteState, id).length;

    return selectionCount >= minSelect && selectionCount <= maxSelect;
  });

  const handleSubmit = () => {
    participateVote({
      receipt_token: receiptToken,
      selections: vote.agendas.map(({ id }) => ({
        agenda_id: id,
        option_ids: [...getSelectedOptionIds(voteState, id)],
      })),
    });
  };

  return (
    <div className="px-2 md:px-0">
      <PageTitle>{vote.title}</PageTitle>

      <div className="mb-8 space-y-2 border-l-2 border-pointBlue px-3">
        <Typography>{vote.description ?? '등록된 투표 안내가 없습니다.'}</Typography>
        <Typography className="!text-sm text-white/60">
          {formatVoteDateTime(vote.startAt)} ~ {formatVoteDateTime(vote.endAt)}
        </Typography>
      </div>

      <div className="flex min-h-[430px] flex-col overflow-hidden rounded-sm border border-white/20 bg-middleBlack md:flex-row">
        <Tabs
          orientation={isMobile ? 'horizontal' : 'vertical'}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          value={currentAgendaTabIndex}
          onChange={handleTabChange}
          aria-label="투표 안건"
          className="w-full border-b border-white/20 !bg-subBlack md:w-64 md:shrink-0 md:border-b-0 md:border-r"
        >
          {vote.agendas.map((agenda, tabIndex) => (
            <Tab
              key={agenda.id}
              id={`vote-tab-${tabIndex}`}
              aria-controls={`vote-tabpanel-${tabIndex}`}
              className="!min-h-16 !min-w-32 !items-start !px-5 !text-left !normal-case !text-white/70 md:!min-w-0"
              label={
                <span className="w-full">
                  <span className="block text-xs text-white/50">안건 {tabIndex + 1}</span>
                  <span className="mt-1 block break-keep">{agenda.title}</span>
                </span>
              }
            />
          ))}
        </Tabs>

        {/* 접근성을 위해 hidden -> 내부에서는 조건부 렌더링으로 설계 */}
        {vote.agendas.map((agenda, tabIndex) => (
          <div
            key={agenda.id}
            role="tabpanel"
            hidden={currentAgendaTabIndex !== tabIndex}
            id={`vote-tabpanel-${tabIndex}`}
            aria-labelledby={`vote-tab-${tabIndex}`}
            className="min-w-0 flex-1"
          >
            {currentAgendaTabIndex === tabIndex && (
              <div className="flex h-[430px] flex-col">
                <VoteAgenda agenda={agenda} voteState={voteState} voteDispatch={voteDispatch} />

                <div className="flex justify-between px-5 pb-5 pt-8 sm:px-8 sm:pb-8">
                  <OutlinedButton
                    disabled={isFirstAgenda}
                    onClick={() => setCurrentAgendaTabIndex((currentIndex) => currentIndex - 1)}
                  >
                    이전
                  </OutlinedButton>
                  <OutlinedButton
                    disabled={isLastAgenda}
                    onClick={() => setCurrentAgendaTabIndex((currentIndex) => currentIndex + 1)}
                  >
                    다음
                  </OutlinedButton>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-end">
        <FilledButton disabled={!canSubmit || isParticipationPending} onClick={handleSubmit}>
          {isParticipationPending ? '제출 중...' : '제출하기'}
        </FilledButton>
      </div>
    </div>
  );
};

export default Vote;
