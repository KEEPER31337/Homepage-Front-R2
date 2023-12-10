export const MEMBER_ROLE_PREFIX = 'ROLE_';

// 1.
export const MEMBER_ROLE = {
  회장: 'ROLE_회장',
  부회장: 'ROLE_부회장',
  서기: 'ROLE_서기',
  총무: 'ROLE_총무',
  사서: 'ROLE_사서',
  학술부장: 'ROLE_학술부장',
  대외부장: 'ROLE_대외부장',
  전산관리자: 'ROLE_전산관리자',
  FRONT_전산관리자: 'ROLE_FRONT_전산관리자',
  BACK_전산관리자: 'ROLE_BACK_전산관리자',
  INFRA_전산관리자: 'ROLE_INFRA_전산관리자',
  회원: 'ROLE_회원',
  출제자: 'ROLE_출제자',
} as const;

// 2.
export const MEMBER_ROLE2 = {
  회장: `${MEMBER_ROLE_PREFIX}회장`,
  부회장: `${MEMBER_ROLE_PREFIX}부회장`,
} as const;

// 3.
const prefix = (detail: string) => `${MEMBER_ROLE_PREFIX}${detail}`;

export const MEMBER_ROLE3 = {
  회장: prefix('회장'),
  부회장: prefix('부회장'),
} as const;
