type WikiSearchType = 'title' | 'content' | 'title+content';
type WikiSortType = 'latest' | 'oldest' | 'created' | 'title';

/** "yyyy-MM-dd HH:mm:ss", 타임존 없음 */
type WikiDateTime = string;

/** Spring Page 직렬화 형식. pageable, sort 필드는 사용하지 않음 */
interface WikiPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  /** 현재 페이지 번호 (0부터 시작) */
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

interface WikiDocumentListParams {
  searchType?: WikiSearchType;
  search?: string;
  /** 기본 'latest' */
  sort?: WikiSortType;
  /** 기본 0 */
  page?: number;
  /** 기본 10, 최대 100 */
  size?: number;
}

interface WikiRevisionListParams {
  /** 기본 0 */
  page?: number;
  /** 기본 10, 최대 100 */
  size?: number;
}

/** GET /wiki/tags/{tagId} 쿼리. 검색 파라미터는 받지 않음 */
interface WikiTagDocumentListParams {
  /** 기본 'latest' */
  sort?: WikiSortType;
  /** 기본 0 */
  page?: number;
  /** 기본 10, 최대 100 */
  size?: number;
}

/** 리비전이 아니라 문서에 붙는 정보. 링크와 라우팅은 tagId로 함 */
interface WikiTag {
  tagId: number;
  name: string;
}

interface WikiDocumentSummary {
  docId: number;
  revisionNo: number;
  title: string;
  lastEditorId: number;
  lastEditorName: string;
  lastEditorThumbnailPath: string | null;
  createdAt: WikiDateTime;
  updatedAt: WikiDateTime;
  /** 문서에 지금 붙어 있는 태그 (태그 이름 오름차순). 없으면 [] (null 아님) */
  tags: WikiTag[];
}

/** docId 순서 기준의 이전/다음 문서. 현재 리비전이 숨겨진 문서는 건너뜀 */
interface WikiAdjacentDocument {
  docId: number;
  title: string;
}

interface WikiDocument {
  docId: number;
  /** 현재 리비전 번호. 수정할 때 baseRevisionNo로 보낼 값 */
  revisionNo: number;
  title: string;
  content: string;
  editSummary: string | null;
  lastEditorId: number;
  lastEditorName: string;
  lastEditorThumbnailPath: string | null;
  createdAt: WikiDateTime;
  updatedAt: WikiDateTime;
  /** 문서에 지금 붙어 있는 태그 (태그 이름 오름차순). 없으면 [] (null 아님) */
  tags: WikiTag[];
  /** docId가 더 작은 문서 중 가장 가까운 문서. 없으면 null */
  previousDoc: WikiAdjacentDocument | null;
  /** docId가 더 큰 문서 중 가장 가까운 문서. 없으면 null */
  nextDoc: WikiAdjacentDocument | null;
}

/** 리비전 응답(WikiRevisionSummary, WikiRevision)에는 tags가 없음 */
interface WikiRevisionSummary {
  revisionNo: number;
  /** hidden 이면 null */
  title: string | null;
  /** 미입력 또는 hidden 이면 null */
  editSummary: string | null;
  writerId: number;
  writerName: string;
  writerThumbnailPath: string | null;
  createdAt: WikiDateTime;
  hidden: boolean;
  /** 직전 리비전 대비 추가된 줄 수 (0~999, 999는 999 이상). 1번 리비전은 빈 문서와 비교. hidden 이어도 항상 숫자 */
  addedLineCount: number;
  /** 직전 리비전 대비 삭제된 줄 수 (0~999, 999는 999 이상). 바뀐 줄은 삭제 1 + 추가 1로 셈 */
  removedLineCount: number;
}

interface WikiRevision {
  docId: number;
  revisionNo: number;
  title: string;
  content: string;
  editSummary: string | null;
  writerId: number;
  writerName: string;
  writerThumbnailPath: string | null;
  createdAt: WikiDateTime;
}

interface WikiDocumentCreateRequest {
  /** 1~250자, 공백만 불가 */
  title: string;
  /** 0~200,000자 */
  content: string;
  /** 0~250자 */
  editSummary?: string;
}

interface WikiDocumentUpdateRequest extends WikiDocumentCreateRequest {
  /** 편집 시작 시점의 revisionNo (1 이상) */
  baseRevisionNo: number;
}

interface WikiDocumentIdResponse {
  docId: number;
  revisionNo: number;
}

/** GET /wiki/tags 응답 항목. 응답 전체는 Page가 아닌 배열 (태그 이름 오름차순) */
interface WikiTagSummary extends WikiTag {
  /** 이 태그가 붙은 문서 수 (0 가능). 현재 리비전이 숨겨진 문서도 셈 */
  documentCount: number;
}

/** GET /wiki/tags/{tagId} 응답 */
interface WikiTagDocuments extends WikiTag {
  /** 이 태그가 붙은 문서 목록. 0건이어도 tagId, name은 옴 */
  documents: WikiPage<WikiDocumentSummary>;
}

/** POST /wiki/tags body. 응답은 201 WikiTag */
interface WikiTagCreateRequest {
  /** trim 후 1~30자. 대소문자를 무시하고 같은 이름이 있으면 409 */
  name: string;
}

/** PUT /wiki/docs/{docId}/tags body. 응답은 200 WikiTag[] (태그 이름 오름차순) */
interface WikiDocumentTagsUpdateRequest {
  /** 문서에 붙일 태그 전체 (전체 교체). [] 이면 모두 제거, 최대 10개(중복 포함) */
  tagIds: number[];
}

export type {
  WikiAdjacentDocument,
  WikiDateTime,
  WikiDocument,
  WikiDocumentCreateRequest,
  WikiDocumentIdResponse,
  WikiDocumentListParams,
  WikiDocumentSummary,
  WikiDocumentTagsUpdateRequest,
  WikiDocumentUpdateRequest,
  WikiPage,
  WikiRevision,
  WikiRevisionListParams,
  WikiRevisionSummary,
  WikiSearchType,
  WikiSortType,
  WikiTag,
  WikiTagCreateRequest,
  WikiTagDocumentListParams,
  WikiTagDocuments,
  WikiTagSummary,
};
