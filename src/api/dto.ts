export interface StaticWriteContentsInfo {
  id: number;
  content: string;
  displayOrder: number;
}

export interface SubTitleImagesInfo {
  id: number;
  subtitle: string;
  thumbnailPath: string | null;
  displayOrder: number;
  staticWriteContents: StaticWriteContentsInfo;
}

export interface PageBlockInfo {
  id: number;
  title: string;
  type: string;
  subtitleImages: SubTitleImagesInfo;
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

export interface BorrowBookInfo {
  id: number;
  borrower: string;
  borrowDate: string;
  returnDate: string;
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
