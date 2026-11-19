import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { VscEyeClosed } from 'react-icons/vsc';
import OutlinedButton from '@components/Button/OutlinedButton';

interface WikiHiddenProps {
  target: '문서' | '리비전';
  docId: number;
}

const WikiHidden = ({ target, docId }: WikiHiddenProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <VscEyeClosed className="fill-pointBlue" size={48} />
      <Typography variant="h3" className="!font-semibold">
        숨겨진 {target}입니다.
      </Typography>
      <Typography className="text-subGray">관리자에 의해 숨김 처리되어 내용을 볼 수 없습니다.</Typography>
      <div className="flex space-x-2">
        <OutlinedButton onClick={() => navigate(`/wiki/view/${docId}/revisions`)}>문서 기록</OutlinedButton>
        <OutlinedButton onClick={() => navigate('/wiki/list')}>위키 목록</OutlinedButton>
      </div>
    </div>
  );
};

export default WikiHidden;
