export const WIKI_LIMITS = {
  TITLE_MAX: 250,
  CONTENT_MAX: 200_000,
  EDIT_SUMMARY_MAX: 250,
  PAGE_SIZE_MAX: 100,
  /** 서버가 앞뒤 공백을 자르기 전 값에 적용하므로 trim()한 값으로 검사하고 보냄 */
  TAG_NAME_MAX: 30,
  /** 문서 하나에 붙일 수 있는 태그 수. 요청의 tagIds는 중복 포함 개수 기준 */
  TAGS_PER_DOCUMENT_MAX: 10,
  /** 리비전의 추가/삭제 줄 수 상한. 서버가 이 값에서 멈추므로 이 값이면 "이 값 이상"을 뜻함 */
  LINE_COUNT_MAX: 999,
} as const;
