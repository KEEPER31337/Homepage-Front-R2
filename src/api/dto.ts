import { DateTime } from 'luxon';

export type SeminarStatus = 'ATTENDANCE' | 'LATENESS' | 'ABSENCE' | 'PERSONAL' | 'BEFORE_ATTENDANCE';

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

export type borrowStatus = '대출대기' | '반납대기' | '대출반려' | '대출중' | '반납완료';

export type MemberType = '비회원' | '정회원' | '휴면회원' | '졸업' | '탈퇴';

export interface PageAndSize {
  page?: number;
  size?: number;
}

export interface MemberInfo {
  memberId: number;
  loginId: number;
  emailAddress: string;
  realName: string;
  thumbnailPath: string | null;
  generation: string;
  memberJobs: Role[];
}

export interface MemberDetailInfo extends MemberInfo {
  birthday: string;
  studentId: string;
  generation: string;
  point: number;
  level: number;
  totalAttendance: number;
  memberType: MemberType;
  memberRank: string;
}

export interface PeriodicInfo {
  year: number;
  season: number;
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

export interface Page {
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

export interface BookListSearch extends PageAndSize {
  searchType?: 'title' | 'author' | 'all';
  search?: string;
}

export interface BorrowInfoListSearch {
  status?: 'requests' | 'willreturn' | 'requests_or_willreturn' | 'overdue';
  search?: string;
  page?: number;
  size?: number;
}
export interface BorrowLogListSearch {
  searchType?: '전체' | '대출중' | '반납대기' | '반납완료' | '대출반려';
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

export interface BorrowInfo {
  borrowInfoId: number;
  bookId: number;
  bookTitle: string;
  author: string;
  borrowerId: number;
  borrowerRealName: string;
  requestDatetime: string | null;
  borrowDateTime: string;
  expiredDateTime: string;
  bookQuantity: string;
  currentQuantity: number;
  totalQuantity: number;
  status: borrowStatus;
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

export interface ManageBookInfo extends BookInfo {
  bookDepartment: string;
  borrowInfos: BorrowInfo[];
  borrowers: string;
}

export type BookCoreData = Pick<ManageBookInfo, 'title' | 'author' | 'bookDepartment' | 'totalQuantity'>;

export interface BorrowedBookInfo {
  borrowInfoId: number;
  thumbnailPath: string;
  bookTitle: string;
  author: string;
  overdue: boolean;
  borrowDateTime: string;
  expireDateTime: string;
  status: borrowStatus;
}

export interface BorrowLogInfo {
  borrowInfoId: number;
  bookId: number;
  bookTitle: string;
  author: string;
  borrowerId: number;
  borrowerRealName: string;
  borrowDateTime: string;
  expireDateTime: string;
  returnDateTime: string;
  rejectDateTime: string;
  status: borrowStatus;
}

export interface StudyLinks {
  gitLink?: string;
  notionLink?: string;
  etcTitle?: string;
  etcLink?: string;
}

export interface StudyCore extends StudyLinks, PeriodicInfo {
  title: string;
  information: string;
  memberIds: number[];
}

export interface UploadStudy {
  request: StudyCore;
  thumbnail?: Blob | null;
}

export interface StudyInfo {
  studyId: number;
  thumbnailPath: string;
  title: string;
  headName: string;
  headId: number;
  memberCount: number;
}

export interface StudyLinkInfo {
  title: string;
  content: string;
}

export interface StudyDetail {
  information: string;
  links: StudyLinkInfo[];
  headMember: Pick<MemberDetailInfo, 'memberId' | 'generation' | 'realName'>;
  members: Pick<MemberDetailInfo, 'memberId' | 'generation' | 'realName'>[];
}

export interface SignUpInfo {
  loginId: string;
  email: string;
  realName: string;
  authCode: string;
  birthday: string;
  studentId: string;
  password: string;
}

export interface SignUpDuplication {
  duplicate: boolean;
}

export interface SeminarCoreInfo {
  id: number;
  name: string;
  openTime: DateTime;
  attendanceCloseTime: DateTime | null;
  latenessCloseTime: DateTime | null;
  statusType: SeminarStatus;
  attendanceCode: string | null;
}

export interface SeminarCardInfo extends SeminarCoreInfo {
  attendanceStartTime: DateTime | null;
  starterId: number | null;
}

export interface SeminarInfo extends SeminarCoreInfo {
  registerTime: DateTime;
  updateTime: DateTime;
}

export interface AttendResponseData {
  id: number;
  statusText: string;
}

export interface MemberSeminarAttendance {
  attendanceId: number;
  attendanceStatus: SeminarStatus;
  excuse: string | null;
  attendDate: string;
}

export interface AttendanceStatus extends MemberSeminarAttendance {
  memberId: number;
  memberName: string;
}

export interface AttendSeminarInfo {
  memberId: number;
  memberName: string;
  generation: number;
  attendances: MemberSeminarAttendance[];
  [key: `date${number}`]: MemberSeminarAttendance;
  totalCount: string;
  totalAttendance: number;
  totalLateness: number;
  totalAbsence: number;
  totalPersonal: number;
}

export interface AttendSeminarListInfo extends Page {
  content: AttendSeminarInfo[];
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
  isDeleted: boolean;
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
  fileId: number;
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
  writerId: number;
  writerName: string;
  writerThumbnailPath: string | null;
  visitCount: number;
  thumbnailPath: string;
  content: string;
  previousPost: AdjacentPostInfo;
  nextPost: AdjacentPostInfo;
  likeCount: number;
  dislikeCount: number;
  fileCount: number;
  isLike: boolean;
  isDislike: boolean;
  isRead: boolean;
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
  likeCount: number;
  isSecret: boolean;
  thumbnailPath: string;
  registerTime: string;
}

export interface BoardSearch {
  categoryId: number;
  searchType?: 'title' | 'content' | 'writer' | 'title+content' | null;
  search?: string | null;
  page?: number;
  size?: number;
}

export interface BoardPosts extends Page {
  content: PostSummaryInfo[];
}

export interface TrendingPostInfo {
  id: number;
  title: string;
  writerName: string;
  writerThumbnailPath: string;
  categoryId: number;
  categoryName: string;
  visitCount: number;
  isSecret: boolean;
  thumbnailPath: string;
  registerTime: string;
}

export interface AttendRankInfo {
  rank: number;
  thumbnailPath?: string | null;
  realName: string;
  generation: string;
  totalAttendance: number;
  continuousDay: number;
  time: string;
}

export interface TodayAttendRank {
  content: AttendRankInfo[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: PageableInfo;
  totalPages: number;
  totalElements: number;
  size: number;
}

export interface PointRankInfo {
  thumbnailPath?: string | null;
  realName: string;
  generation: string;
  point: number;
}

export interface PointRank {
  content: PointRankInfo[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: PageableInfo;
  totalPages: number;
  totalElements: number;
  size: number;
}

export interface GameRankInfo {
  rank: number;
  realName: string;
  generation: string;
  todayEarnedPoint: number;
  thumbnailPath?: string | null;
  memberId: number;
}

export interface MeritLogInfo {
  id: number;
  giveTime: string;
  awarderName?: string;
  awarderGeneration?: string;
  score: number;
  meritTypeId: number;
  reason: string;
  isMerit: boolean;
}

export interface MeritLog {
  content: MeritLogInfo[];
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

export interface MeritTypeInfo {
  id: number;
  score: number;
  detail: string;
  isMerit: boolean;
}

export interface MeritType {
  content: MeritTypeInfo[];
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

export interface MembersMeritInfo {
  memberId: number;
  memberName: string;
  generation: string;
  merit: number;
  demerit: number;
}

export interface MembersMerit {
  content: MembersMeritInfo[];
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

export interface ExecutiveInfo {
  jobId: number;
  jobName: string;
  memberId: number;
  generation: string;
  realName: string;
}

export interface JobList {
  jobId: number;
  jobName: string;
}

export interface MemberPostInfo {
  id: number;
  title: string;
  categoryId: number;
  categoryName: string;
  visitCount: number;
  isSecret: boolean;
  registerTime: string;
}

export interface MemberPost {
  content: MemberPostInfo[];
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

export interface MemberTempPostInfo {
  id: number;
  title: string;
  categoryId: number;
  categoryName: string;
  registerTime: string;
}

export interface MemberTempPost {
  content: MemberTempPostInfo[];
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

export interface PointLogInfo {
  point: number;
  description: string;
  date: string;
}

export interface PointLog {
  content: PointLogInfo[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: PageableInfo;
  totalPages: number;
  totalElements: number;
  size: number;
}

export interface CallenderChartInfo {
  day: string;
  value: number;
}

export interface FollowInfo {
  id: number;
  name: string;
  generation: string;
  thumbnailPath: string | null;
}

export interface ProfileInfo {
  id: number;
  studentId?: number;
  realName: string;
  generation: string;
  birthday: string;
  emailAddress: string;
  thumbnailPath: string | null;
  point: number;
  memberType: MemberType;
  memberJobs: Role[];
  follower: FollowInfo[];
  followee: FollowInfo[];
}

export interface TodayAttendPoint {
  point: number;
  continuousPoint: number;
  rankPoint: number;
  randomPoint: number;
}

export interface TodayAttendInfo {
  totalAttendance: number;
  continuousDay: number;
  todayRank: number;
  todayPoint: number;
}

export interface RoleInfo {
  name: string;
  img: string;
}
