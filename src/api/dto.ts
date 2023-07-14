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

export interface BookListInfo {
  id: number;
  no: number;
  title: string;
  author: string;
  borrowState: string;
  information: string;
  enable: boolean;
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
