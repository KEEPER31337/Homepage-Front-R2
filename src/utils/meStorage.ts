import type { MemberDetailInfo } from '@api/dto';

// 20 days, 날짜 자체가 큰 의미는 없음. 애초에 인증 쿠기 절대 만료가 30일이기 때문에, 적당히 충분한 값을 선택하였음.
const MAX_AGE = 20 * 24 * 60 * 60 * 1000;

export const storeMe = (data: MemberDetailInfo) => {
  window.localStorage.setItem('me', JSON.stringify({ data, updatedAt: Date.now() }));
};

export const removeMe = () => {
  window.localStorage.removeItem('me');
};

// undefined : 저장된 정보가 없어, 서버에서 확인해야함. 클라이언트에서는 상태를 정확히 알 수 없음.
// undefined 자체가 tanstack query와 관련있는 값이므로 함부로 바꾸면 안됨.
export const getStoredMe = (): MemberDetailInfo | undefined => {
  try {
    const raw = window.localStorage.getItem('me');
    if (raw === null) return undefined;

    const stored = JSON.parse(raw);
    const age = Date.now() - stored?.updatedAt;

    if (age >= 0 && age < MAX_AGE) {
      return stored.data;
    }
  } catch {}

  removeMe();

  return undefined;
};
