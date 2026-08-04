import { DateTime } from 'luxon';
import {
  AdminVoteListItem,
  GetAdminVotesResponse,
  GetVotesResponse,
  VoteAgendaInfo,
  VoteDetail,
  VoteListItem,
  VoteParticipationRequest,
  VoteParticipationResponse,
} from '@api/voteDto';

const CURRENT_YEAR = DateTime.now().year;
const formatApiDateTime = (dateTime: DateTime) => dateTime.toFormat("yyyy-MM-dd'T'HH:mm:ss");

const currentMonthStart = DateTime.now().startOf('month').set({ hour: 9 });
const currentMonthEnd = DateTime.now().endOf('month').set({ millisecond: 0 });

const createVoteMockError = (status: 403 | 404, message: string) =>
  Object.assign(new Error(message), {
    response: {
      status,
      data: { message },
    },
  });

const voteList: VoteListItem[] = [
  {
    id: 1,
    title: `${CURRENT_YEAR}년 하반기 회장단 선거`,
    description: 'KEEPER를 이끌어 갈 회장단을 선출하는 투표입니다.',
    startAt: formatApiDateTime(currentMonthStart),
    endAt: formatApiDateTime(currentMonthEnd),
    participated: 1,
  },
  {
    id: 2,
    title: '여름방학 세미나 주제 투표',
    description: '여름방학에 함께 진행할 세미나 주제를 정하는 투표입니다.',
    startAt: formatApiDateTime(currentMonthStart.plus({ hours: 1 })),
    endAt: formatApiDateTime(currentMonthEnd),
    participated: 3,
  },
  {
    id: 4,
    title: '정회원 대상 행사 일정 투표',
    description: '하반기 정회원 행사의 일정을 정하기 위한 투표입니다.',
    startAt: formatApiDateTime(currentMonthStart.plus({ hours: 2 })),
    endAt: formatApiDateTime(currentMonthEnd),
    participated: 2,
  },
  {
    id: 3,
    title: `${CURRENT_YEAR}년 1학기 운영진 선거`,
    description: `${CURRENT_YEAR}년 1학기 운영진을 선출한 투표입니다.`,
    startAt: `${CURRENT_YEAR}-03-10T09:00:00`,
    endAt: `${CURRENT_YEAR}-03-17T18:00:00`,
    participated: 4,
  },
  {
    id: 103,
    title: `${CURRENT_YEAR - 1}년 회장단 선거`,
    description: `${CURRENT_YEAR - 1}년도 회장단을 선출한 투표입니다.`,
    startAt: `${CURRENT_YEAR - 1}-11-10T09:00:00`,
    endAt: `${CURRENT_YEAR - 1}-11-17T18:00:00`,
    participated: 4,
  },
  {
    id: 102,
    title: `${CURRENT_YEAR - 2}년 회장단 선거`,
    description: `${CURRENT_YEAR - 2}년도 회장단을 선출한 투표입니다.`,
    startAt: `${CURRENT_YEAR - 2}-11-11T09:00:00`,
    endAt: `${CURRENT_YEAR - 2}-11-18T18:00:00`,
    participated: 4,
  },
  {
    id: 101,
    title: `${CURRENT_YEAR - 3}년 회장단 선거`,
    description: null,
    startAt: `${CURRENT_YEAR - 3}-11-12T09:00:00`,
    endAt: `${CURRENT_YEAR - 3}-11-19T18:00:00`,
    participated: 4,
  },
];

const adminVoteMetadata = new Map<number, Pick<AdminVoteListItem, 'permitByUserIds' | 'participantCount'>>([
  [1, { permitByUserIds: [16381, 26381, 169151, 46381, 56381], participantCount: 3 }],
  [2, { permitByUserIds: [16381, 26381, 36381], participantCount: 2 }],
  [4, { permitByUserIds: [], participantCount: 0 }],
  [3, { permitByUserIds: [16381, 26381], participantCount: 2 }],
  [103, { permitByUserIds: [16381, 26381, 36381, 46381], participantCount: 4 }],
  [102, { permitByUserIds: [16381, 26381, 36381], participantCount: 3 }],
  [101, { permitByUserIds: [169151], participantCount: 1 }],
]);

const compareVotesByNewest = (
  firstVote: Pick<VoteListItem, 'id' | 'startAt'>,
  secondVote: Pick<VoteListItem, 'id' | 'startAt'>,
) => {
  const startAtDifference =
    DateTime.fromISO(secondVote.startAt).toMillis() - DateTime.fromISO(firstVote.startAt).toMillis();

  return startAtDifference || secondVote.id - firstVote.id;
};

const createVoteDetail = (voteId: number, agendas: VoteAgendaInfo[]): VoteDetail => {
  const vote = voteList.find(({ id }) => id === voteId);

  if (!vote) {
    throw new Error(`[voteId] ${voteId}: 존재하지 않는 투표입니다.`);
  }

  return {
    id: vote.id,
    title: vote.title,
    description: vote.description,
    startAt: vote.startAt,
    endAt: vote.endAt,
    agendas,
  };
};

const voteDetails: VoteDetail[] = [
  createVoteDetail(1, [
    {
      id: 1,
      title: '회장 선출',
      minSelect: 1,
      maxSelect: 1,
      options: [
        { id: 1, content: '김키퍼' },
        { id: 2, content: '이키퍼' },
        { id: 15, content: '박키퍼' },
        { id: 16, content: '최키퍼' },
        { id: 17, content: '정키퍼' },
        { id: 18, content: '한키퍼' },
        { id: 19, content: '윤키퍼' },
        { id: 20, content: '장키퍼' },
        { id: 21, content: '임키퍼' },
        { id: 22, content: '조키퍼' },
        { id: 23, content: '신키퍼' },
        { id: 24, content: '오키퍼' },
      ],
    },
    {
      id: 2,
      title: '부회장 선출',
      minSelect: 1,
      maxSelect: 1,
      options: [
        { id: 3, content: '박키퍼' },
        { id: 4, content: '최키퍼' },
      ],
    },
    {
      id: 3,
      title: '회칙 개정안',
      minSelect: 1,
      maxSelect: 1,
      options: [
        { id: 5, content: '찬성' },
        { id: 6, content: '반대' },
        { id: 7, content: '기권' },
      ],
    },
  ]),
  createVoteDetail(2, [
    {
      id: 4,
      title: '세미나 주제',
      minSelect: 1,
      maxSelect: 2,
      options: [
        { id: 8, content: '웹 보안' },
        { id: 9, content: '리버싱' },
        { id: 10, content: '클라우드' },
      ],
    },
    {
      id: 5,
      title: '진행 방식',
      minSelect: 1,
      maxSelect: 1,
      options: [
        { id: 11, content: '오프라인' },
        { id: 12, content: '온라인' },
      ],
    },
  ]),
  createVoteDetail(3, [
    {
      id: 6,
      title: '운영진 선출',
      minSelect: 1,
      maxSelect: 1,
      options: [
        { id: 13, content: '박키퍼' },
        { id: 14, content: '최키퍼' },
      ],
    },
  ]),
];

const getVotesMock = async (year: number): Promise<GetVotesResponse> => ({
  votes: voteList.filter(({ startAt }) => DateTime.fromISO(startAt).year === year).toSorted(compareVotesByNewest),
});

const getAdminVotesMock = async (year: number): Promise<GetAdminVotesResponse> => ({
  votes: voteList
    .filter(({ startAt }) => DateTime.fromISO(startAt).year === year)
    .map(({ id, title, description, startAt, endAt }) => ({
      id,
      title,
      description,
      startAt,
      endAt,
      ...(adminVoteMetadata.get(id) ?? { permitByUserIds: [], participantCount: 0 }),
    }))
    .toSorted(compareVotesByNewest),
});

const getVoteMock = async (voteId: number): Promise<VoteDetail> => {
  const vote = voteDetails.find(({ id }) => id === voteId);

  if (vote) {
    return vote;
  }

  if (voteList.some(({ id }) => id === voteId)) {
    throw createVoteMockError(403, `[voteId] ${voteId}: 투표에 참여할 권한이 없습니다.`);
  }

  throw createVoteMockError(404, `[voteId] ${voteId}: 존재하지 않는 투표입니다.`);
};

const participateVoteMock = async (
  voteId: number,
  request: VoteParticipationRequest,
): Promise<VoteParticipationResponse> => {
  const vote = voteList.find(({ id }) => id === voteId);
  const voteDetail = voteDetails.find(({ id }) => id === voteId);

  if (!vote || !voteDetail) {
    throw createVoteMockError(404, `[voteId] ${voteId}: 존재하지 않는 투표입니다.`);
  }

  const response: VoteParticipationResponse = {
    receiptToken: crypto.randomUUID(),
    selections: voteDetail.agendas.map((agenda) => {
      const selectedOptionIds = request.selections.find(({ agendaId }) => agendaId === agenda.id)?.optionIds ?? [];

      return {
        agendaId: agenda.id,
        agendaTitle: agenda.title,
        options: agenda.options
          .filter(({ id }) => selectedOptionIds.includes(id))
          .map(({ id, content }) => ({ optionId: id, content })),
      };
    }),
  };

  vote.participated = 3;

  return response;
};

export { getAdminVotesMock, getVoteMock, getVotesMock, participateVoteMock };
