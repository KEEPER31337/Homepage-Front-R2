export interface CardMainInfoProps {
  title: string;
  isSecret: boolean;
  registerTime: string;
}

export interface CardDetailInfoProps {
  writerId: number;
  writerThumbnailPath: string | null;
  writerName: string;
  registerTime: string;
}

export interface InteractionScoreProps {
  visitCount: number;
  commentCount: number;
  likeCount: number;
}
