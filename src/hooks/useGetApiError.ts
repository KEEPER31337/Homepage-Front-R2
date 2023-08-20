/* eslint-disable no-console */
import { AxiosError } from 'axios';
import { useCallback } from 'react';

type ErrorHandler = (error?: AxiosError) => void;

interface ServiceCodeHandler {
  [key: number]: ErrorHandler;
  default?: ErrorHandler;
}

interface HttpStatusHandlers {
  [key: number]: ServiceCodeHandler;
  default?: ErrorHandler;
}

interface DefaultHandler {
  default: ErrorHandler;
}

interface DefaultHttpStatusHandlers extends DefaultHandler {
  [key: number]: ServiceCodeHandler & DefaultHandler;
}

/* NOTE 현재 백엔드에서 반환하는 HTTP 에러
  400 - BAD_REQUEST
  401 - UNAUTHORIZED
  403 - FORBIDDEN
  404 - NOT_FOUND
  409 - CONFICT
  500 - SERVER_ERROR
*/

const defaultHandlers: DefaultHttpStatusHandlers = {
  default: () => {
    console.log('알 수 없는 에러가 발생하였습니다.');
  },
  400: {
    default: () => {
      console.log('400 에러 발생');
    },
  },
  401: {
    default: () => {
      console.log('401 에러 발생');
    },
  },
  403: {
    default: () => {
      console.log('403 에러 발생');
    },
  },
  409: {
    default: () => {
      console.log('409 에러 발생');
    },
  },
  500: {
    default: () => {
      console.log('500 에러 발생');
    },
  },
};

const useApiError = (handlers?: HttpStatusHandlers) => {
  const handleError = useCallback(
    (error, serviceCode) => {
      const httpStatus: number = error.response.status;

      if (handlers && handlers[httpStatus][serviceCode]) {
        // 우선순위 1. 컴포넌트에서 (HTTP Status, 서비스 표준 에러 Code) Key 조합으로 재정의한 핸들러
        handlers[httpStatus][serviceCode]();
      } else if (handlers && handlers[httpStatus]) {
        // 우선순위 2. 컴포넌트에서 (HTTP Status) Key로 재정의한 핸들러
        handlers[httpStatus].default?.();
      } else if (defaultHandlers[httpStatus][serviceCode]) {
        // 우선순위 3. Hook에서 (HTTP Status, 서비스 표준 에러 Code) Key 조합으로 정의한 핸들러
        defaultHandlers[httpStatus][serviceCode]();
      } else if (defaultHandlers[httpStatus]) {
        // 우선순위 4. Hook에서 (HTTP Status) Key로 정의한 핸들러
        defaultHandlers[httpStatus].default();
      } else {
        // 우선순위 5. 어디에서도 정의되지 못한 에러를 처리하는 핸들러
        defaultHandlers.default();
      }
    },
    [handlers],
  );

  return { handleError };
};

// eslint-disable-next-line import/prefer-default-export
export { useApiError };
