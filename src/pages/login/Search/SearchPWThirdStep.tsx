import React from 'react';
import { Link } from 'react-router-dom';
import OutlinedButton from '@components/Button/OutlinedButton';

const SearchPWThirdStep = () => {
  return (
    <>
      <div className="mb-4 py-32 text-center text-xs sm:py-36">
        <p className="text-paragraph sm:text-base">비밀번호가 재설정 되었습니다.</p>
      </div>
      <Link to="/login" className="block text-center">
        <OutlinedButton className="w-full sm:w-fit">로그인 페이지로</OutlinedButton>
      </Link>
    </>
  );
};

export default SearchPWThirdStep;
