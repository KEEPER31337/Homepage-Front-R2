// 서버 동작이 이상함.

// 익명 게시글에는 writerId = 1로 주는데
// 익명 댓글에는 writerId = null로 줌.
// 추후 고민해봐야함

// 원래 USER ID = 1은 가상 유저로써 탈퇴한 사용자의 글들을 보존하기 위해 유저 값을 대체하는게 주 용도인데
// 이게 익명 게시글에도 쓰이는 형태임.

export const ANONYMOUS_OR_VIRTUAL_USER_ID = 1;

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
  대외부원: `${MEMBER_ROLE_PREFIX}대외부원`,
  학술부원: `${MEMBER_ROLE_PREFIX}학술부원`,
  전산관리부원: `${MEMBER_ROLE_PREFIX}전산관리부원`,
  사서부원: `${MEMBER_ROLE_PREFIX}사서부원`,
  서기부원: `${MEMBER_ROLE_PREFIX}서기부원`,
  총무부원: `${MEMBER_ROLE_PREFIX}총무부원`,
  회원: `${MEMBER_ROLE_PREFIX}회원`,
  출제자: `${MEMBER_ROLE_PREFIX}출제자`,
} as const;

export const isJuniorExecutiveRole = (role: string) => role.startsWith(MEMBER_ROLE_PREFIX) && role.endsWith('부원');
