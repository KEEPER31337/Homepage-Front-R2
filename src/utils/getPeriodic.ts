import { DateTime } from 'luxon';

export const getCurrentSeasonNumber = () => {
  const currentMonth = DateTime.now().month;
  if (currentMonth >= 3 && currentMonth <= 6) return 1;
  if (currentMonth >= 7 && currentMonth <= 8) return 2;
  if (currentMonth >= 9 && currentMonth <= 12) return 3;
  return 4;
};

export const getCurrentSeasonText = () => {
  const season = {
    1: '1학기',
    2: '여름방학',
    3: '2학기',
    4: '겨울방학',
  };
  return season[getCurrentSeasonNumber()];
};
