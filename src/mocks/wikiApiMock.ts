import { DateTime } from 'luxon';
import {
  WikiAdjacentDocument,
  WikiDateTime,
  WikiDocument,
  WikiDocumentCreateRequest,
  WikiDocumentIdResponse,
  WikiDocumentListParams,
  WikiDocumentSummary,
  WikiDocumentUpdateRequest,
  WikiPage,
  WikiRevision,
  WikiRevisionListParams,
  WikiRevisionSummary,
  WikiSearchType,
  WikiSortType,
} from '@api/wikiDto';
import { WIKI_LIMITS } from '@constants/wiki';

type MockWriter = Pick<WikiRevision, 'writerId' | 'writerName' | 'writerThumbnailPath'>;
type MockRevision = Omit<WikiRevision, 'docId'> & { hidden: boolean };
/** revisions는 revisionNo 오름차순이고 마지막 요소가 현재 리비전 */
type MockDocument = { docId: number; revisions: MockRevision[] };
/** [title, content, 작성자(members 인덱스), createdAt, editSummary, hidden] */
type RevisionSeed = [string, string, number, WikiDateTime, string | null, boolean?];

const MOCK_DELAY_MS = 200;
const DEFAULT_PAGE_SIZE = 10;
const SEARCH_TYPES: WikiSearchType[] = ['title', 'content', 'title+content'];
const SORT_TYPES: WikiSortType[] = ['latest', 'oldest', 'created', 'title'];

const delay = () =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, MOCK_DELAY_MS);
  });

const createWikiMockError = (status: 400 | 403 | 404 | 409, message: string) =>
  Object.assign(new Error(message), {
    response: {
      status,
      data: { message },
    },
  });

const formatDateTime = (dateTime: DateTime) => dateTime.toFormat('yyyy-MM-dd HH:mm:ss');
const now = DateTime.now();
const daysAgo = (days: number, hour: number, minute = 0) =>
  formatDateTime(now.minus({ days }).set({ hour, minute, second: 0 }));
/** 오늘 날짜이면서 현재보다 이른 시각 */
const earlierToday = formatDateTime(now.hour >= 1 ? now.minus({ hours: 1 }) : now.startOf('day'));

const members: MockWriter[] = [
  { writerId: 101, writerName: '김민준', writerThumbnailPath: null },
  { writerId: 102, writerName: '이서연', writerThumbnailPath: null },
  { writerId: 103, writerName: '박지호', writerThumbnailPath: null },
  { writerId: 104, writerName: '최유진', writerThumbnailPath: null },
  { writerId: 105, writerName: '정하늘', writerThumbnailPath: null },
];
/** 생성/수정 요청의 작성자 (인증 연동 없이 고정) */
const MOCK_WRITER = members[0];

const createDocument = (docId: number, ...seeds: RevisionSeed[]): MockDocument => ({
  docId,
  revisions: seeds.map(([title, content, writer, createdAt, editSummary, hidden = false], index) => ({
    revisionNo: index + 1,
    title,
    content,
    editSummary,
    ...members[writer],
    createdAt,
    hidden,
  })),
});

const keeperIntroContent = `# KEEPER 소개

KEEPER는 정보보안을 공부하는 대학 동아리입니다. 웹 해킹, 시스템 해킹, 리버싱, 포렌식 등을 함께 공부하고 CTF와 개발 프로젝트에 참여합니다.

## 주요 활동

- **정기 세미나**: 매주 목요일 19시, 회원이 돌아가며 발표합니다.
- **스터디**: 학기마다 분야별 스터디를 모집합니다.
  - 입문 스터디는 신입 회원을 우선 배정합니다.
- **CTF**: 국내외 대회에 팀으로 참가합니다.

## 운영진

| 직책 | 담당 업무 |
| --- | --- |
| 회장 | 동아리 운영 총괄, 대외 협력 |
| 부회장 | 회장 보좌, 행사 기획 |
| 총무 | 회비 관리, 물품 구매 |
| 학술부장 | 세미나와 스터디 일정 관리 |

> 처음 오셨다면 **신입 회원 가이드** 문서를 먼저 읽어주세요.
`;

const sqlInjectionContent = `# SQL Injection 입문

> 허가받지 않은 시스템을 공격하는 것은 불법입니다. 실습은 워게임이나 직접 구축한 환경에서만 하세요.

## 원리

사용자 입력을 쿼리 문자열에 그대로 이어 붙이면 입력값으로 쿼리 구조를 바꿀 수 있습니다.

\`\`\`java
String query = "SELECT * FROM users WHERE id = '" + id + "' AND pw = '" + pw + "'";
\`\`\`

\`id\`에 \`admin' -- \`를 넣으면 비밀번호 조건이 주석 처리되어 로그인이 우회됩니다.

## 주요 유형

| 유형 | 특징 | 예시 페이로드 |
| --- | --- | --- |
| Union-based | UNION으로 다른 테이블 조회 | \`' UNION SELECT 1, username, password FROM users-- \` |
| Blind | 참/거짓 응답 차이로 추론 | \`' AND SUBSTR(password, 1, 1) = 'a'-- \` |

## 방어 방법

1. **Prepared Statement**로 입력값을 쿼리와 분리합니다.
2. DB 계정에는 필요한 최소 권한만 부여합니다.

\`\`\`java
PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE id = ? AND pw = ?");
\`\`\`

참고: [OWASP - SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
`;

const duesTitle = `${now.year}년 상반기 회비 사용 내역`;
const duesContent = '| 항목 | 금액 |\n| --- | --- |\n| 간식비 | 120,000원 |\n| CTF 참가비 | 200,000원 |';

/** docId 3: 리비전 12개, 6번은 숨김 */
const BYLAWS_HIDDEN_REVISION_NO = 6;
const bylawsArticles = [
  '## 제1조 (명칭)\n\n본 동아리의 명칭은 KEEPER라 한다.',
  '## 제2조 (목적)\n\n본 동아리는 정보보안 분야의 학술 연구와 회원 간 교류를 목적으로 한다.',
  '## 제3조 (회원)\n\n회원은 정회원, 휴면회원, 졸업회원으로 구분한다.',
  '## 제4조 (임원)\n\n임원은 회장, 부회장, 총무, 학술부장으로 구성한다.',
  '## 제5조 (회비)\n\n정회원은 매 학기 정해진 회비를 납부한다.',
  '## 제6조 (총회)\n\n정기총회는 매 학기 초에 개최한다.',
  '## 제7조 (징계)\n\n회칙을 위반한 회원은 운영진 회의를 거쳐 징계할 수 있다.',
];
const bylawsEditSummaries = [
  '최초 작성',
  '제2조 문구 수정',
  null,
  '제3조 회원 구분 추가',
  '오타 수정',
  '광고 문구 삽입',
  null,
  '임원 구성 수정',
  '회비 조항 추가',
  null,
  '징계 조항 추가',
  `${now.year}년 정기총회 개정 사항 반영`,
];
const bylawsRevisionSeeds = bylawsEditSummaries.map((editSummary, index): RevisionSeed => {
  const revisionNo = index + 1;
  const hidden = revisionNo === BYLAWS_HIDDEN_REVISION_NO;
  const title = revisionNo <= 3 ? 'KEEPER 동아리 회칙' : 'KEEPER 회칙';
  const articles = bylawsArticles.slice(0, 1 + Math.ceil(revisionNo / 2)).join('\n\n');
  const content = hidden ? '# 회칙\n\n지금 가입하면 포인트 지급! 링크를 확인하세요.' : `# KEEPER 회칙\n\n${articles}`;
  const isLast = revisionNo === bylawsEditSummaries.length;
  const createdAt = isLast ? earlierToday : daysAgo(200 - revisionNo * 15, 8 + revisionNo, revisionNo * 4);

  return [title, content, index % members.length, createdAt, editSummary, hidden];
});

/** [docId, title, summary, 작성자(members 인덱스), 생성 n일 전, 수정 n일 전] */
const simpleDocumentSeeds: [number, string, string, number, number, number?][] = [
  [2, '신입 회원 가이드', '처음 가입한 회원이 알아야 할 활동 방식과 연락 채널입니다.', 1, 380, 30],
  [5, '리버싱 기초: 어셈블리와 디버거', 'x86-64 어셈블리와 GDB, Ghidra 사용법을 다룹니다.', 3, 140],
  [6, '포너블 입문: 스택 버퍼 오버플로우', '스택 프레임 구조와 NX, ASLR 보호 기법을 설명합니다.', 3, 135, 60],
  [7, 'CTF 참가 가이드', '팀 구성, 문제 분배, write-up 작성 방법을 안내합니다.', 2, 120],
  [8, '리눅스 필수 명령어', 'ls, find, grep 등 실습 서버에서 자주 쓰는 명령어입니다.', 4, 110, 25],
  [9, '서버실 이용 수칙', '서버실 출입 기록과 실습 서버 계정 발급 절차입니다.', 0, 100],
  [10, 'Git 협업 규칙', '브랜치 전략, 커밋 메시지, PR 리뷰 절차를 정리합니다.', 4, 95, 20],
  [11, '세미나 진행 가이드', '세미나 발표 신청과 자료 공유 방법을 안내합니다.', 1, 90],
  [12, '스터디 개설 및 운영 방법', '스터디 개설 신청과 결과 보고서 작성 방법입니다.', 1, 85, 5],
  [13, '홈페이지 프로젝트 구조', 'KEEPER 홈페이지 저장소 구조와 배포 방식을 설명합니다.', 4, 80, 2],
  [14, '동아리방 장비 목록', '노트북, 라즈베리 파이 등 장비 목록과 대여 방법입니다.', 0, 75],
  [15, '암호학 기초: 대칭키와 공개키', 'AES, RSA, 해시 함수의 개념을 정리합니다.', 2, 70],
  [16, 'Wireshark 패킷 분석', '디스플레이 필터와 TCP 스트림 추적 방법을 다룹니다.', 3, 60, 15],
  [17, '디지털 포렌식 입문', '디스크 이미지 분석과 파일 시그니처를 소개합니다.', 4, 55],
  [18, '정보보안 관련 자격증', '정보보안기사, OSCP 시험 구성과 준비 방법입니다.', 2, 50],
  [20, '워게임 사이트 추천', '분야별 워게임 사이트와 난이도를 정리합니다.', 0, 40, 7],
  [21, '해커톤 참가 후기', '해커톤에 참가한 회원들의 후기와 보안 팁을 모았습니다.', 1, 30],
  [22, '자주 묻는 질문 (FAQ)', '회비, 활동 인정 기준, 휴면 전환 관련 질문입니다.', 0, 20, 1],
  [23, '보안 뉴스 스크랩', '최근 주요 보안 사고와 취약점 소식을 정리합니다.', 2, 12],
];

const simpleDocuments = simpleDocumentSeeds.map(([docId, title, summary, writer, created, updated]) => {
  const content = `## 개요\n\n${summary}\n\n- 작성 중인 문서입니다. 자유롭게 보강해주세요.`;
  const seeds: RevisionSeed[] = [[title, content, writer, daysAgo(created, 10 + (docId % 8), docId), '최초 작성']];

  if (updated !== undefined) {
    const editor = (writer + 1) % members.length;
    const editSummary = docId % 2 === 0 ? '내용 보강' : null;
    seeds.push([title, `${content}\n- 최신 정보를 반영했습니다.`, editor, daysAgo(updated, 20), editSummary]);
  }

  return createDocument(docId, ...seeds);
});

const documents: MockDocument[] = [
  createDocument(
    1,
    ['KEEPER 소개', keeperIntroContent.split('## 운영진')[0].trim(), 0, daysAgo(400, 14), '최초 작성'],
    ['KEEPER 소개', keeperIntroContent, 1, daysAgo(3, 22, 10), '운영진 표 추가'],
  ),
  createDocument(3, ...bylawsRevisionSeeds),
  createDocument(
    4,
    ['SQL Injection 입문', sqlInjectionContent.split('## 방어')[0].trim(), 2, daysAgo(150, 16), null],
    ['SQL Injection 입문', sqlInjectionContent, 3, daysAgo(10, 13, 45), '방어 방법 추가'],
  ),
  // 현재 리비전이 숨김 → 상세 조회 시 403
  createDocument(
    19,
    [duesTitle, duesContent, 3, daysAgo(45, 18), '최초 작성'],
    [duesTitle, '개인 계좌번호가 포함된 버전입니다.', 4, daysAgo(40, 21, 5), '입금 계좌 추가', true],
  ),
  ...simpleDocuments,
];

let nextDocId = Math.max(...documents.map(({ docId }) => docId)) + 1;

const getCurrentRevision = ({ revisions }: MockDocument) => revisions[revisions.length - 1];

const findDocument = (docId: number) => {
  const doc = documents.find((item) => item.docId === docId);

  if (!doc) {
    throw createWikiMockError(404, `[docId] ${docId}: 존재하지 않는 위키 문서입니다.`);
  }

  return doc;
};

const toPage = <T>(items: T[], page: number, size: number): WikiPage<T> => {
  const pageSize = Math.min(Math.max(Math.floor(size) || DEFAULT_PAGE_SIZE, 1), WIKI_LIMITS.PAGE_SIZE_MAX);
  const number = Math.max(Math.floor(page) || 0, 0);
  const content = items.slice(number * pageSize, (number + 1) * pageSize);
  const totalPages = Math.ceil(items.length / pageSize);

  return {
    content,
    totalElements: items.length,
    totalPages,
    number,
    size: pageSize,
    numberOfElements: content.length,
    first: number === 0,
    last: number + 1 >= totalPages,
    empty: content.length === 0,
  };
};

const toDocumentSummary = (doc: MockDocument): WikiDocumentSummary => {
  const current = getCurrentRevision(doc);

  return {
    docId: doc.docId,
    revisionNo: current.revisionNo,
    title: current.title,
    lastEditorId: current.writerId,
    lastEditorName: current.writerName,
    lastEditorThumbnailPath: current.writerThumbnailPath,
    createdAt: doc.revisions[0].createdAt,
    updatedAt: current.createdAt,
  };
};

const toAdjacentDocument = (doc: MockDocument | undefined): WikiAdjacentDocument | null =>
  doc ? { docId: doc.docId, title: getCurrentRevision(doc).title } : null;

/** docId 순서 기준으로 가장 가까운 이전/다음 문서. 현재 리비전이 숨겨진 문서는 건너뜀 */
const getAdjacentDocuments = (docId: number) => {
  const visibleDocs = documents.filter((doc) => !getCurrentRevision(doc).hidden).toSorted((a, b) => a.docId - b.docId);

  return {
    previousDoc: toAdjacentDocument(visibleDocs.findLast((doc) => doc.docId < docId)),
    nextDoc: toAdjacentDocument(visibleDocs.find((doc) => doc.docId > docId)),
  };
};

const compareText = (a: string, b: string) => Number(a > b) - Number(a < b);

const documentComparators: Record<WikiSortType, (a: WikiDocumentSummary, b: WikiDocumentSummary) => number> = {
  latest: (a, b) => compareText(b.updatedAt, a.updatedAt) || b.docId - a.docId,
  oldest: (a, b) => compareText(a.updatedAt, b.updatedAt) || a.docId - b.docId,
  created: (a, b) => compareText(b.createdAt, a.createdAt) || b.docId - a.docId,
  title: (a, b) => compareText(a.title.toLowerCase(), b.title.toLowerCase()) || b.docId - a.docId,
};

/** 서버 body 검증과 같은 문구. 실패가 여러 개면 ", "로 이어 붙임 */
const validateDocumentRequest = (request: Partial<Record<'title' | 'content' | 'editSummary', string | null>>) => {
  const { title, content, editSummary } = request;
  const errors: string[] = [];

  if (title === undefined || title === null || !title.trim()) {
    errors.push(`[title] ${title ?? null}: 문서 제목을 입력해주세요.`);
  } else if (title.length > WIKI_LIMITS.TITLE_MAX) {
    errors.push(`[title] ${title}: 문서 제목은 ${WIKI_LIMITS.TITLE_MAX}자 이하로 입력해주세요.`);
  }

  if (content === undefined || content === null) {
    errors.push('[content] null: 문서 내용을 입력해주세요.');
  } else if (content.length > WIKI_LIMITS.CONTENT_MAX) {
    errors.push(`[content] ${content}: 문서 내용은 ${WIKI_LIMITS.CONTENT_MAX}자 이하로 입력해주세요.`);
  }

  if (editSummary && editSummary.length > WIKI_LIMITS.EDIT_SUMMARY_MAX) {
    errors.push(`[editSummary] ${editSummary}: 편집 요약은 ${WIKI_LIMITS.EDIT_SUMMARY_MAX}자 이하로 입력해주세요.`);
  }

  return errors;
};

const appendRevision = (doc: MockDocument, { title, content, editSummary }: WikiDocumentCreateRequest) => {
  const revisionNo = doc.revisions.length + 1;
  const createdAt = formatDateTime(DateTime.now());

  doc.revisions.push({
    revisionNo,
    title,
    content,
    editSummary: editSummary ?? null,
    ...MOCK_WRITER,
    createdAt,
    hidden: false,
  });

  return { docId: doc.docId, revisionNo };
};

const getWikiDocsMock = async (params: WikiDocumentListParams = {}): Promise<WikiPage<WikiDocumentSummary>> => {
  const { searchType, search, sort = 'latest', page = 0, size = DEFAULT_PAGE_SIZE } = params;

  await delay();

  if (!SORT_TYPES.includes(sort)) {
    throw createWikiMockError(400, `[sort] ${sort}: 존재하지 않는 정렬 타입입니다.`);
  }

  const keyword = search?.trim() ? search.toLowerCase() : '';

  if (searchType && keyword && !SEARCH_TYPES.includes(searchType)) {
    throw createWikiMockError(400, `[searchType] ${searchType}: 존재하지 않는 검색 타입입니다.`);
  }

  const summaries = documents
    .filter((doc) => {
      if (!searchType || !keyword) return true;

      const { title, content } = getCurrentRevision(doc);

      return (
        (searchType !== 'content' && title.toLowerCase().includes(keyword)) ||
        (searchType !== 'title' && content.toLowerCase().includes(keyword))
      );
    })
    .map((doc) => toDocumentSummary(doc))
    .toSorted(documentComparators[sort]);

  return toPage(summaries, page, size);
};

const getWikiDocMock = async (docId: number): Promise<WikiDocument> => {
  await delay();

  const doc = findDocument(docId);
  const { content, editSummary, hidden } = getCurrentRevision(doc);

  if (hidden) {
    throw createWikiMockError(403, `[docId] ${docId}: 숨겨진 리비전입니다.`);
  }

  return { ...toDocumentSummary(doc), content, editSummary, ...getAdjacentDocuments(docId) };
};

const getWikiRevisionsMock = async (
  docId: number,
  { page = 0, size = DEFAULT_PAGE_SIZE }: WikiRevisionListParams = {},
): Promise<WikiPage<WikiRevisionSummary>> => {
  await delay();

  const summaries = findDocument(docId)
    .revisions.toReversed()
    .map(({ revisionNo, title, editSummary, writerId, writerName, writerThumbnailPath, createdAt, hidden }) => ({
      revisionNo,
      title: hidden ? null : title,
      editSummary: hidden ? null : editSummary,
      writerId,
      writerName,
      writerThumbnailPath,
      createdAt,
      hidden,
    }));

  return toPage(summaries, page, size);
};

const getWikiRevisionMock = async (docId: number, revisionNo: number): Promise<WikiRevision> => {
  await delay();

  const revision = findDocument(docId).revisions.find((item) => item.revisionNo === revisionNo);

  if (!revision) {
    throw createWikiMockError(404, `[revisionNo] ${revisionNo}: 존재하지 않는 리비전입니다.`);
  }

  const { hidden, ...fields } = revision;

  if (hidden) {
    throw createWikiMockError(403, `[revisionNo] ${revisionNo}: 숨겨진 리비전입니다.`);
  }

  return { docId, ...fields };
};

const createWikiDocMock = async (request: WikiDocumentCreateRequest): Promise<WikiDocumentIdResponse> => {
  await delay();

  const errors = validateDocumentRequest(request);

  if (errors.length > 0) {
    throw createWikiMockError(400, errors.join(', '));
  }

  const doc: MockDocument = { docId: nextDocId, revisions: [] };
  nextDocId += 1;
  documents.push(doc);

  return appendRevision(doc, request);
};

const updateWikiDocMock = async (
  docId: number,
  request: WikiDocumentUpdateRequest,
): Promise<WikiDocumentIdResponse> => {
  await delay();

  const errors = validateDocumentRequest(request);

  if (request.baseRevisionNo === undefined || request.baseRevisionNo === null) {
    errors.push('[baseRevisionNo] null: 기준 리비전 번호를 입력해주세요.');
  }

  if (errors.length > 0) {
    throw createWikiMockError(400, errors.join(', '));
  }

  const doc = findDocument(docId);

  if (request.baseRevisionNo !== getCurrentRevision(doc).revisionNo) {
    throw createWikiMockError(
      409,
      `[baseRevisionNo] ${request.baseRevisionNo}: 다른 사용자가 먼저 수정했습니다. 최신 버전을 확인해주세요.`,
    );
  }

  return appendRevision(doc, request);
};

export {
  createWikiDocMock,
  getWikiDocMock,
  getWikiDocsMock,
  getWikiRevisionMock,
  getWikiRevisionsMock,
  updateWikiDocMock,
};
