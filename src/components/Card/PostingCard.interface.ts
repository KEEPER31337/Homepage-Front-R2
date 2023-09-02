export interface CardMainInfoProps {
  type?: string;
  title: string;
  isSecret: boolean;
}

export interface CardDetailInfoProps {
  writerThumbnailPath: string | null;
  writerName: string;
  registerTime: string;
}

export interface InteractionScoreProps {
  visitCount: number;
  commentCount: number;
  likeCount: number;
}
