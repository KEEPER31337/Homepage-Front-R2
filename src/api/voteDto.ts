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

interface VoteParticipationRequest {
  receipt_token: string;
  selections: {
    agenda_id: number;
    option_ids: number[];
  }[];
}

export type {
  GetVotesResponse,
  VoteAgendaInfo,
  VoteDetail,
  VoteListItem,
  VoteOptionInfo,
  VoteParticipationRequest,
  VoteParticipationStatus,
};
