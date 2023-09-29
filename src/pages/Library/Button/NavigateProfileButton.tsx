import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import memberState from '@recoil/member.recoil';
import OutlinedButton from '@components/Button/OutlinedButton';

const NavigateProfileButton = () => {
  const userInfo = useRecoilValue(memberState);
  const navigate = useNavigate();

  return (
    <OutlinedButton
      small
      onClick={() => {
        navigate(`/profile/${userInfo?.memberId}/book`);
      }}
    >
      내 서재 가기
    </OutlinedButton>
  );
};

export default NavigateProfileButton;
