import React from 'react';
import { Link } from 'react-router-dom';
import OutlinedButton from '@components/Button/OutlinedButton';

const SearchPWThirdStep = () => {
  return (
    <>
      <div className="flex justify-center py-20">
        <p>비밀번호가 재설정 되었습니다.</p>
      </div>
      <div className="text-center">
        <Link to="/login">
          <OutlinedButton>로그인 페이지로</OutlinedButton>
        </Link>
      </div>
    </>
  );
};

export default SearchPWThirdStep;
