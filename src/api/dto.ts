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
