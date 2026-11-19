import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import OutlinedButton from '@components/Button/OutlinedButton';
import PageTitle from '@components/Typography/PageTitle';
import WikiViewSwitchButton from './Button/WikiViewSwitchButton';
import WikiSearchSection from './Section/WikiSearchSection';

const WikiLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleWriteButtonClick = () => {
    navigate('/wiki/write');
  };

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle>위키</PageTitle>
        <OutlinedButton onClick={handleWriteButtonClick}>문서 작성</OutlinedButton>
      </div>
      <div className="flex items-center justify-between pb-5">
        {/* NOTE 대문과 목록은 이 레이아웃을 공유해 상태가 유지되므로, 페이지를 바꿀 때 검색창을 URL 기준으로 다시 초기화합니다. */}
        <WikiSearchSection key={pathname} />
        <WikiViewSwitchButton />
      </div>
      <Outlet />
    </div>
  );
};

export default WikiLayout;
