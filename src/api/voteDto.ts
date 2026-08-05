type VoteParticipationStatus = 1 | 2 | 3 | 4;

interface VoteListItem {
  id: number;
  title: string;
  description: string | null;
  startAt: string;
  endAt: string;
  participated: VoteParticipationStatus;
}

interface GetVotesResponse {
  votes: VoteListItem[];
}

interface AdminVoteListItem extends Omit<VoteListItem, 'participated'> {
  permitByUserIds: number[];
  participantCount: number;
}

interface GetAdminVotesResponse {
  votes: AdminVoteListItem[];
}

interface VoteCreationRequest {
  title: string;
  description: string | null;
  permitByUserIds: number[];
  startAt: string;
  endAt: string;
  agendas: {
    title: string;
    minSelect: number;
    maxSelect: number;
    options: {
      content: string;
    }[];
  }[];
}

interface VoteCreationResponse {
  id: number;
}

interface VoteOptionInfo {
  id: number;
  content: string;
}

interface VoteAgendaInfo {
  id: number;
  title: string;
  minSelect: number;
  maxSelect: number;
  options: VoteOptionInfo[];
}

interface VoteDetail {
  id: number;
  title: string;
  description: string | null;
  startAt: string;
  endAt: string;
  agendas: VoteAgendaInfo[];
}

interface VoteResultParticipation {
  realName: string;
  generation: string;
}

interface VoteResultChoice {
  agendaId: number;
  optionIds: number[];
}

interface VoteResultReceiptTokenChoice {
  receiptToken: string;
  choices: VoteResultChoice[];
}

interface VoteResultResponse {
  participations: VoteResultParticipation[];
  receiptTokenChoices: VoteResultReceiptTokenChoice[];
  vote: VoteDetail;
}

interface VoteParticipationRequest {
  selections: {
    agendaId: number;
    optionIds: number[];
  }[];
}

interface VoteParticipationOption {
  optionId: number;
  content: string;
}

interface VoteParticipationSelection {
  agendaId: number;
  agendaTitle: string;
  options: VoteParticipationOption[];
}

interface VoteParticipationResponse {
  receiptToken: string;
  selections: VoteParticipationSelection[];
}

export type {
  AdminVoteListItem,
  GetAdminVotesResponse,
  GetVotesResponse,
  VoteAgendaInfo,
  VoteCreationRequest,
  VoteCreationResponse,
  VoteDetail,
  VoteListItem,
  VoteOptionInfo,
  VoteParticipationOption,
  VoteParticipationRequest,
  VoteParticipationResponse,
  VoteParticipationSelection,
  VoteParticipationStatus,
  VoteResultChoice,
  VoteResultParticipation,
  VoteResultReceiptTokenChoice,
  VoteResultResponse,
};
