import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery } from '@api/meApi';
import OutlinedButton from '@components/Button/OutlinedButton';

const NavigateProfileButton = () => {
  const { data: userInfo } = useMeQuery();
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
