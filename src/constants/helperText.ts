export const REQUIRE_ERROR_MSG = '필수 정보입니다.';
export const NUMBER_ERROR_MSG = '숫자만 입력 가능합니다.';
export const PASSWORD_ERROR_MSG = '8~20자 영문과 숫자를 사용하세요.';
export const MIN_LENGTH_ERROR_MSG = (min: number) => `${min}글자 이상 입력해주세요.` as const;
