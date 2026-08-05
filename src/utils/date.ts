import { DateTime } from 'luxon';

const formatVoteDateTime = (dateTime: string) => {
  const parsedDateTime = DateTime.fromISO(dateTime);

  return parsedDateTime.isValid ? parsedDateTime.toFormat('yyyy.MM.dd HH:mm') : dateTime;
};

export { formatVoteDateTime };
