import React, { Dispatch } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { VoteAgendaInfo } from '@api/voteDto';
import { AGENDA_OPTION_TOGGLE, getSelectedOptionIds, VoteAction, VoteState } from './useVoteState';

interface VoteAgendaProps {
  agenda: VoteAgendaInfo;
  voteState: VoteState;
  voteDispatch: Dispatch<VoteAction>;
}

const VoteAgenda = ({ agenda, voteState, voteDispatch }: VoteAgendaProps) => {
  const selectedOptionIds = getSelectedOptionIds(voteState, agenda.id);
  const selectionGuide =
    agenda.minSelect === agenda.maxSelect
      ? `${agenda.minSelect}개를 선택해 주세요.`
      : `${agenda.minSelect}개 이상 ${agenda.maxSelect}개 이하로 선택해 주세요.`;

  return (
    <div className="flex min-h-0 flex-1 flex-col px-5 pt-5 sm:px-8 sm:pt-8">
      <div>
        <Typography variant="h3" className="!font-semibold">
          {agenda.title}
        </Typography>
        <Typography className="!mt-2 text-white/60">{selectionGuide}</Typography>
      </div>

      <FormGroup className="!mt-8 min-h-0 flex-1 !flex-nowrap gap-3 overflow-y-auto pr-2">
        {agenda.options.map(({ id, content }) => {
          const isSelected = selectedOptionIds.includes(id);
          const isSelectionLimitReached = selectedOptionIds.length >= agenda.maxSelect;

          return (
            <FormControlLabel
              key={id}
              className="!m-0 shrink-0 rounded-sm border border-white/10 bg-subBlack px-3 py-2 hover:border-pointBlue/60"
              control={
                <Checkbox
                  checked={isSelected}
                  disabled={!isSelected && isSelectionLimitReached}
                  onChange={() =>
                    voteDispatch({
                      type: AGENDA_OPTION_TOGGLE,
                      payload: { agendaId: agenda.id, optionId: id },
                    })
                  }
                />
              }
              label={<Typography>{content}</Typography>}
            />
          );
        })}
      </FormGroup>
    </div>
  );
};

export default VoteAgenda;
