export interface CardMainInfoProps {
  type?: string;
  title: string;
}

export interface CardDetailInfoProps {
  writerThumbnailPath: string | null;
  writerName: string;
  registerTime: string;
}

export interface InteractionScoreProps {
  visitCount: number;
  commentCount: number;
}
