import { DateTime } from 'luxon';

const formatVoteDateTime = (dateTime: string) => {
  const parsedDateTime = DateTime.fromISO(dateTime);

  return parsedDateTime.isValid ? parsedDateTime.toFormat('yyyy.MM.dd HH:mm') : dateTime;
};

/* NOTE 위키 API의 시각은 타임존 없는 "yyyy-MM-dd HH:mm:ss" 문자열이라 포맷을 명시해서 파싱합니다. */
const parseWikiDateTime = (dateTime: string) => DateTime.fromFormat(dateTime, 'yyyy-MM-dd HH:mm:ss');

const formatWikiDateTime = (dateTime: string) => {
  const parsedDateTime = parseWikiDateTime(dateTime);

  return parsedDateTime.isValid ? parsedDateTime.toFormat('yyyy-MM-dd HH:mm') : dateTime;
};

/* NOTE 메인 페이지(Trendings)와 같이 luxon toRelative()로 "3일 전"처럼 표시합니다. */
const formatWikiRelativeDateTime = (dateTime: string) => parseWikiDateTime(dateTime).toRelative() ?? dateTime;

export { formatVoteDateTime, formatWikiDateTime, formatWikiRelativeDateTime, parseWikiDateTime };
