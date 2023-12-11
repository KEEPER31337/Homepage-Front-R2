export const COMMON = {
  success: {},
  error: {
    required: '필수 정보입니다.',
    onlyNumber: '숫자만 입력 가능합니다.',
    onlyHttps: 'https:// 로 시작해야 합니다.',
    minLength: (min: number) => `${min}글자 이상 입력해주세요.` as const,
    maxLength: (max: number) => `최대 ${max}글자 입력해주세요.` as const,
  },
} as const;

export const EMAIL_MSG = {
  success: {},
  error: {
    formatError: '이메일 형식을 확인해주세요.',
  },
} as const;

export const PASSWORD_MSG = {
  success: {
    correct: '비밀번호가 일치합니다.',
  },
  error: {
    incorrect: '비밀번호가 일치하지 않습니다.',
    formatError: '8~20자 영문과 숫자를 사용하세요.',
  },
} as const;

export const NAME_MSG = {
  success: {},
  error: {
    formatError: '1~20자 한글, 영어만 가능합니다.',
  },
} as const;

export const SEND_POINT_MSG = {
  success: {},
  error: {
    overMaxValue: '보유 포인트보다 많은 포인트를 보낼 수 없습니다.',
  },
} as const;

export const LOGIN_ID_MSG = {
  success: {},
  error: {
    formatError: '4~12자 영어, 숫자, _ 만 가능합니다.',
  },
} as const;

export const STUDY_MSG = {
  success: {},
  error: {
    onlyGitLink: '깃허브 링크만 입력이 가능합니다.',
  },
} as const;
