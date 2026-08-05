import { useReducer } from 'react';

const AGENDA_OPTION_TOGGLE = 'AGENDA_OPTION_TOGGLE' as const;

type VoteState = {
  agendaId: number;
  optionIds: number[];
}[];

interface VoteAction {
  type: typeof AGENDA_OPTION_TOGGLE;
  payload: {
    agendaId: number;
    optionId: number;
  };
}

const initialVoteState: VoteState = [];

const voteReducer = (state: VoteState, action: VoteAction): VoteState => {
  switch (action.type) {
    case AGENDA_OPTION_TOGGLE: {
      const { agendaId, optionId } = action.payload;
      const agendaSelection = state.find((selection) => selection.agendaId === agendaId);

      if (!agendaSelection) {
        return [...state, { agendaId, optionIds: [optionId] }];
      }

      const isOptionAlreadySelected = agendaSelection.optionIds.includes(optionId);
      
      if (isOptionAlreadySelected) {
        const excludedOptionIds = agendaSelection.optionIds.filter((id) => id !== optionId);

        if (excludedOptionIds.length === 0) {
          return state.filter((selection) => selection.agendaId !== agendaId);
        }

        return state.map((selection) =>
          selection.agendaId === agendaId ? { ...selection, optionIds: excludedOptionIds } : selection,
        );
      }
      
      const includedOptionIds = [...agendaSelection.optionIds, optionId];

      return state.map((selection) =>
        selection.agendaId === agendaId ? { ...selection, optionIds: includedOptionIds } : selection,
      );
    }
  }
};

const getSelectedOptionIds = (state: VoteState, agendaId: number) =>
  state.find((selection) => selection.agendaId === agendaId)?.optionIds ?? [];

const useVoteState = () => useReducer(voteReducer, initialVoteState);

export { AGENDA_OPTION_TOGGLE, getSelectedOptionIds, voteReducer };
export type { VoteAction, VoteState };
export default useVoteState;
