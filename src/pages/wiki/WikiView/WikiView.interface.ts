/* NOTE 문서 상세(WikiDocument)와 리비전 상세(WikiRevision)의 응답 형태가 달라, 화면에서는 이 모델로 통일해서 사용합니다. */
export interface WikiViewModel {
  docId: number;
  revisionNo: number;
  title: string;
  content: string;
  editorId: number;
  editorName: string;
  editorThumbnailPath: string | null;
  /** "yyyy-MM-dd HH:mm:ss". 문서는 마지막 수정 시각, 리비전은 저장 시각 */
  editedAt: string;
}
