export const COMMON = {} as const;

export const PASSWORD = {
  success: {
    changed: '비밀번호가 변경되었습니다.',
  },
  error: {
    mismatch: '현재 비밀번호가 일치하지 않습니다.',
  },
} as const;

export const BOARD = {
  success: {},
  error: {
    readCondition: '게시글 열람 조건을 충족하지 않습니다.',
    mismatchPassword: '게시글의 비밀번호가 일치하지 않습니다.',
    requiredComment: '댓글 작성이 필요합니다.',
  },
} as const;

export const SEMINAR = {
  success: {},
  error: {
    duplicateSeminarDate: '동일한 날짜의 세미나는 생성할 수 없습니다.',
  },
} as const;

export const EMAIL = {
  success: {
    changed: '이메일 변경 성공하였습니다.',
  },
  error: {
    existing: '이미 존재하는 이메일입니다.',
  },
} as const;

export const MEMBER_CARD = {
  success: {},
  error: {
    noSubmissionsLeft: '남은 제출 횟수가 없습니다.',
    mismatchWithCount: (min: number) => `출석코드가 틀렸습니다. (남은 제출횟수 ${min}회)` as const,
  },
} as const;

export const LOGIN_ID = {
  success: {},
  error: {
    existing: '이미 존재하는 아이디입니다.',
  },
};

export const STUDENT_ID = {
  success: {},
  error: {
    existing: '이미 존재하는 학번입니다.',
  },
};
