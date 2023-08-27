import { DateTime } from 'luxon';

export type ActivityStatus = 'ATTENDANCE' | 'LATENESS' | 'ABSENCE' | 'PERSONAL' | 'BEFORE_ATTENDANCE';

export type Role =
  | 'ROLE_회장'
  | 'ROLE_부회장'
  | 'ROLE_서기'
  | 'ROLE_총무'
  | 'ROLE_사서'
  | 'ROLE_학술부장'
  | 'ROLE_대외부장'
  | 'ROLE_FRONT_전산관리자'
  | 'ROLE_BACK_전산관리자'
  | 'ROLE_INFRA_전산관리자'
  | 'ROLE_회원'
  | 'ROLE_출제자';

export interface MemberInfo {
  memberId: number;
  loginId: number;
  emailAddress: string;
  realName: string;
  thumbnailPath: string | null;
  memberJobs: Role[];
}

export interface MemberDetailInfo extends MemberInfo {
  birthday: string;
  studentId: string;
  generation: number;
  point: number;
  level: number;
  totalAttendance: number;
  memberType: string;
  memberRank: string;
}

export interface StaticWriteContentsInfo {
  id: number;
  content: string;
  displayOrder: number;
}

export interface SubTitleImagesInfo {
  id: number;
  subtitle: string;
  thumbnailPath: string | undefined;
  displayOrder: number;
  staticWriteContents: Array<StaticWriteContentsInfo>;
}

export interface PageBlockInfo {
  id: number;
  title: string;
  type: string;
  subtitleImages: Array<SubTitleImagesInfo>;
}

export interface BookListSearch {
  searchType?: 'title' | 'author' | 'all';
  search?: string;
  page?: number;
  size?: number;
}

export interface BookListInfo {
  id: number;
  no: number;
  title: string;
  author: string;
  borrowState: string;
  information: string;
  enable: boolean;
}
export interface BookInfo {
  bookId: number;
  thumbnailPath: string;
  title: string;
  author: string;
  bookQuantity: string;
  currentQuantity: number;
  totalQuantity: number;
  canBorrow: boolean;
}

export interface BorrowedBookInfo {
  borrowInfoId: number;
  title: string;
  author: string;
  overdue: boolean;
  borrowDate: string;
  expireDate: string;
}

export interface StudyLinkInfo {
  title: string;
  contents: string;
}

export interface StudyMemberInfo {
  id: number;
  emailAddress: string;
  nickName: string;
  realName: string;
  registerDate: string;
  point: number;
  level: number;
  rank: string;
  type: string;
  jobs: string[];
  thumbnailPath: string;
  merit: number;
  demerit: number;
  generation: number;
}

export interface StudyListInfo {
  id: number;
  title: string;
  information: string;
  memberNumber: number;
  registerTime: string;
  year: number;
  season: number;
  link: StudyLinkInfo[];
  thumbnailPath: string;
  headMember: StudyMemberInfo;
  memberList: StudyMemberInfo[];
}

export interface SignUpInfo {
  loginId: string;
  email: string;
  realName: string;
  nickname: string;
  authCode: string;
  birthday: string;
  studentId: string;
  password: string;
}

export interface SignUpDuplication {
  duplicate: boolean;
}

export interface SeminarInfo {
  seminarId: number;
  seminarName: string;
  openTime: DateTime;
  attendanceCloseTime: DateTime;
  latenessCloseTime: DateTime;
  statusType: ActivityStatus;
  attendanceCode: string;
}

export interface AvailableSeminarInfo {
  id: number;
  openTime: string;
  attendanceCloseTime: string;
  latenessCloseTime: string;
  attendanceCode: string;
  name: string;
  registerTime: string;
  updateTime: string;
}

export interface AttendResponseData {
  id: number;
  statusText: string;
}
export interface CommentInfo {
  commentId: number;
  writerId: number;
  writerName: string;
  writerThumbnailPath: string | null;
  content: string | null;
  registerTime: string;
  parentId: number | null;
  likeCount: number;
  dislikeCount: number;
  isLike: boolean;
  isDislike: boolean;
}

export interface UploadPostSettings {
  isNotice: boolean;
  isSecret: boolean;
  isTemp: boolean;
  allowComment: boolean;
  password?: string;
}

export interface UploadPostCore extends UploadPostSettings {
  title: string;
  content: string;
  categoryId: number;
}

export interface UploadPost {
  request: UploadPostCore;
  thumbnail?: Blob | null;
  files?: File[];
}

export interface FileInfo {
  id: number;
  name: string;
  path: string;
  size: number;
  ipAddress: string;
  uploadTime: string;
}

export interface AdjacentPostInfo {
  postId: number;
  title: string;
}

export interface PostInfo {
  categoryId: number;
  categoryName: string;
  title: string;
  writerName: string;
  writerThumbnailPath: string | null;
  visitCount: number;
  thumbnailPath: string;
  content: string;
  previousPost: AdjacentPostInfo;
  nextPost: AdjacentPostInfo;
  likeCount: number;
  dislikeCount: number;
  allowComment: boolean;
  isNotice: boolean;
  isSecret: boolean;
  isTemp: boolean;
  registerTime: string;
  updateTime: string;
}

export interface PostSummaryInfo {
  id: number;
  title: string;
  writerName: string;
  writerThumbnailPath: string;
  visitCount: number;
  commentCount: number;
  isSecret: boolean;
  thumbnailPath: string;
  registerTime: string;
}

export interface PageSortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableInfo {
  sort: PageSortInfo;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface BoardSearch {
  categoryId: number;
  searchType?: 'title' | 'content' | 'writer' | 'title+content' | null;
  search?: string | null;
  page?: number;
  size?: number;
}

export interface BoardPosts {
  content: PostSummaryInfo[];
  pageable: PageableInfo;
  first: boolean;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: PageSortInfo;
  numberOfElements: number;
  empty: boolean;
}
