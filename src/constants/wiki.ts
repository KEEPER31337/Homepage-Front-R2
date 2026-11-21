export const WIKI_LIMITS = {
  TITLE_MAX: 250,
  CONTENT_MAX: 200_000,
  EDIT_SUMMARY_MAX: 250,
  PAGE_SIZE_MAX: 100,
  /** 리비전의 추가/삭제 줄 수 상한. 서버가 이 값에서 멈추므로 이 값이면 "이 값 이상"을 뜻함 */
  LINE_COUNT_MAX: 999,
} as const;
