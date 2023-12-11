export const MEMBER_ROLE_PREFIX = 'ROLE_';

export const MEMBER_ROLE = {
  회장: `${MEMBER_ROLE_PREFIX}회장`,
  부회장: `${MEMBER_ROLE_PREFIX}부회장`,
  서기: `${MEMBER_ROLE_PREFIX}서기`,
  총무: `${MEMBER_ROLE_PREFIX}총무`,
  사서: `${MEMBER_ROLE_PREFIX}사서`,
  학술부장: `${MEMBER_ROLE_PREFIX}학술부장`,
  대외부장: `${MEMBER_ROLE_PREFIX}대외부장`,
  전산관리자: `${MEMBER_ROLE_PREFIX}전산관리자`,
  FRONT_전산관리자: `${MEMBER_ROLE_PREFIX}FRONT_전산관리자`,
  BACK_전산관리자: `${MEMBER_ROLE_PREFIX}BACK_전산관리자`,
  INFRA_전산관리자: `${MEMBER_ROLE_PREFIX}INFRA_전산관리자`,
  회원: `${MEMBER_ROLE_PREFIX}회원`,
  출제자: `${MEMBER_ROLE_PREFIX}출제자`,
} as const;
