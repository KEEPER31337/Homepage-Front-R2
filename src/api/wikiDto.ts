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

interface WikiDocumentSummary {
  docId: number;
  revisionNo: number;
  title: string;
  lastEditorId: number;
  lastEditorName: string;
  lastEditorThumbnailPath: string | null;
  createdAt: WikiDateTime;
  updatedAt: WikiDateTime;
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
  /** docId가 더 작은 문서 중 가장 가까운 문서. 없으면 null */
  previousDoc: WikiAdjacentDocument | null;
  /** docId가 더 큰 문서 중 가장 가까운 문서. 없으면 null */
  nextDoc: WikiAdjacentDocument | null;
}

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

export type {
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
};
