import React from 'react';
import { Typography } from '@mui/material';

import { VoteDetail } from '@api/voteDto';
import ActionModal from '@components/Modal/ActionModal';
import { getSelectedOptionIds, VoteState } from './useVoteState';

interface VoteSubmitModalProps {
  open: boolean;
  vote: VoteDetail;
  voteState: VoteState;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const VoteSubmitModal = ({ open, vote, voteState, isSubmitting, onClose, onSubmit }: VoteSubmitModalProps) => {
  return (
    <ActionModal
      open={open}
      onClose={onClose}
      modalWidth="sm"
      title="투표 제출"
      cancelButtonDisabled={isSubmitting}
      actionButtonDisabled={isSubmitting}
      actionButtonName={isSubmitting ? '제출 중...' : '제출하기'}
      onActionButonClick={onSubmit}
    >
      <Typography className="text-white/80">선택한 내용을 확인해 주세요.</Typography>

      <div className="mt-4 max-h-[50vh] space-y-3 overflow-y-auto pr-1">
        {vote.agendas.map((agenda) => {
          const selectedOptionIds = getSelectedOptionIds(voteState, agenda.id);
          const selectedOptions = agenda.options.filter(({ id }) => selectedOptionIds.includes(id));

          return (
            <section key={agenda.id} className="rounded-sm border border-white/10 bg-middleBlack px-4 py-3">
              <Typography component="h3" className="!text-sm !font-semibold text-white/60">
                {agenda.title}
              </Typography>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedOptions.map((option) => (
                  <span key={option.id} className="rounded-sm bg-pointBlue/20 px-2.5 py-1 text-sm text-white">
                    {option.content}
                  </span>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <Typography className="!mt-4 !text-sm text-white/50">제출 후에는 선택 내용을 변경할 수 없습니다.</Typography>
    </ActionModal>
  );
};

export default VoteSubmitModal;
